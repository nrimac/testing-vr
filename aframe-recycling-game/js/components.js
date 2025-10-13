AFRAME.registerComponent('game-manager', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const itemsToSpawn = 5;
    const itemTypes = [
      { type: 'plastic', shape: 'box', color: '#FFC300' },
      { type: 'paper', shape: 'cylinder', color: '#C70039' },
      { type: 'metal', shape: 'sphere', color: '#900C3F' }
    ];

    for (let i = 0; i < itemsToSpawn; i++) {
      const itemDetails = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const item = document.createElement(`a-${itemDetails.shape}`);
      
      item.setAttribute('class', 'recyclable');
      item.setAttribute('recyclable-type', itemDetails.type);
      item.setAttribute('color', itemDetails.color);
      item.setAttribute('scale', '0.2 0.2 0.2');
      item.setAttribute('grabbable', '');
      item.setAttribute('dynamic-body', '');

      // Random position
      const x = Math.random() * 4 - 2; // -2 to 2
      const z = Math.random() * 4 - 2; // -2 to 2
      item.setAttribute('position', `${x} 1 ${z}`);

      sceneEl.appendChild(item);
    }
  }
});