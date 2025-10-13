AFRAME.registerComponent('item', {
  schema: {
    type: {type: 'string'}
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    let color = '#FFFFFF';
    switch (data.type) {
      case 'plastic':
        color = '#FF5733'; // Red for plastic
        break;
      case 'paper':
        color = '#33FF57'; // Green for paper
        break;
      case 'metal':
        color = '#3357FF'; // Blue for metal
        break;
    }
    el.setAttribute('color', color);

    // Make item grabbable
    el.classList.add('grabbable');
    el.setAttribute('grabbable', '');

    // Add collision listener
    el.addEventListener('collide', this.handleCollision.bind(this));
  },

  handleCollision: function (event) {
    const bin = event.detail.body.el;
    if (bin.classList.contains('recycling-bin')) {
      const itemType = this.data.type;
      const binType = bin.getAttribute('bin-type');
      const scoreText = document.querySelector('#scoreText');
      const gameEl = this.el.sceneEl.querySelector('[game]');
      let score = gameEl.getAttribute('game').score;

      if (binType === itemType) {
        score += 1;
        gameEl.setAttribute('game', 'score', score);
        scoreText.setAttribute('text', `value: Score: ${score}; align: center;`);
        console.log(`Score: ${score}`);
        this.el.parentNode.removeChild(this.el); // Remove item
      } else {
        console.log('Wrong bin!');
      }
    }
  }
});