const RecyclingBin = {
  schema: {
    type: { type: 'string', default: 'recyclable' }
  },
  
  init: function () {
    this.el.addEventListener('collide', this.onCollide.bind(this));
  },

  onCollide: function (event) {
    const itemType = event.detail.body.el.getAttribute('data-type');
    const binType = this.data.type;

    if (itemType === binType) {
      console.log(`Correctly sorted: ${itemType}`);
      // Add scoring logic here
      event.detail.body.el.parentNode.removeChild(event.detail.body.el); // Remove item
    } else {
      console.log(`Incorrectly sorted: ${itemType}`);
      // Add penalty logic here
    }
  }
};

AFRAME.registerComponent('recycling-bin', RecyclingBin);

const RecyclableItem = {
  schema: {
    type: { type: 'string', default: 'plastic' }
  },

  init: function () {
    this.el.setAttribute('data-type', this.data.type);
    this.el.setAttribute('dynamic-body', ''); // Enable physics
  }
};

AFRAME.registerComponent('recyclable-item', RecyclableItem);