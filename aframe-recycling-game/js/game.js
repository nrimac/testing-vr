AFRAME.registerComponent('bin-checker', {
  init: function () {
    this.el.addEventListener('body-entered', (evt) => {
      const recyclable = evt.detail.body.el;
      if (!recyclable.classList.contains('recyclable')) {
        return;
      }

      const binType = this.el.getAttribute('bin-type');
      const recyclableType = recyclable.getAttribute('recyclable-type');

      if (binType === recyclableType) {
        // Correct bin
        const scoreText = document.querySelector('#scoreText');
        let currentScore = parseInt(scoreText.getAttribute('text').value.split(': ')[1]);
        currentScore++;
        scoreText.setAttribute('text', 'value', `Score: ${currentScore}`);
        
        // Remove the recyclable
        recyclable.parentNode.removeChild(recyclable);
      } else {
        // Incorrect bin - do nothing for now, or add penalty logic
        console.log(`Incorrect! ${recyclableType} does not go in ${binType} bin.`);
      }
    });
  }
});