// This file contains the game logic, including item spawning, collision detection, and scoring. It manages the overall flow of the game.

AFRAME.registerComponent('game-manager', {
  schema: {
    score: { type: 'int', default: 0 },
    items: { type: 'array', default: ['plastic', 'paper', 'metal'] }
  },

  init: function () {
    this.spawnItems();
    this.checkCollisions();
  },

  spawnItems: function () {
    const sceneEl = this.el.sceneEl;
    const items = this.data.items;

    items.forEach((item, index) => {
      const itemEl = document.createElement('a-box');
      itemEl.setAttribute('color', this.getColor(item));
      itemEl.setAttribute('position', `${Math.random() * 4 - 2} 1 -5`);
      itemEl.setAttribute('dynamic-body', '');
      itemEl.setAttribute('item', item);
      sceneEl.appendChild(itemEl);
    });
  },

  getColor: function (item) {
    switch (item) {
      case 'plastic':
        return '#FF5733'; // Red for plastic
      case 'paper':
        return '#33FF57'; // Green for paper
      case 'metal':
        return '#3357FF'; // Blue for metal
      default:
        return '#FFFFFF'; // Default color
    }
  },

  checkCollisions: function () {
    const bins = document.querySelectorAll('.recycling-bin');
    const items = document.querySelectorAll('a-box');

    items.forEach(item => {
      item.addEventListener('collide', (event) => {
        const bin = event.detail.body.el;
        if (bins.includes(bin)) {
          const itemType = item.getAttribute('item');
          if (bin.getAttribute('bin-type') === itemType) {
            this.data.score += 1;
            console.log(`Score: ${this.data.score}`);
            item.parentNode.removeChild(item);
          } else {
            console.log('Wrong bin!');
          }
        }
      });
    });
  }
});