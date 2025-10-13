AFRAME.registerComponent('game', {
  schema: {
    score: { type: 'number', default: 0 },
  },

  init: function () {
    this.spawnItems();
  },

  spawnItems: function () {
    const sceneEl = this.el.sceneEl;
    const items = ['plastic', 'paper', 'metal'];

    items.forEach((itemType) => {
      const itemEl = document.createElement('a-box');
      // Use the 'item' component to set up the object
      itemEl.setAttribute('item', {type: itemType});
      itemEl.setAttribute('position', `${Math.random() * 4 - 2} 1 -5`);
      itemEl.setAttribute('dynamic-body', '');
      sceneEl.appendChild(itemEl);
    });
  },
});