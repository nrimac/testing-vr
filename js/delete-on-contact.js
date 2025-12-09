AFRAME.registerComponent('delete-on-contact', {
  init: function () {
    // Listen for the physics system's collision event
    this.el.addEventListener('collide', (e) => {
      
      // e.detail.body refers to the physics body of the object that hit the bin
      // We access the A-Frame element attached to that body via .el
      const hitEl = e.detail.body ? e.detail.body.el : null;

      // Check if the element exists and has the 'grabbable' class
      if (hitEl && hitEl.classList.contains('grabbable')) {
        
        // Remove the element from the scene if it is still attached
        if (hitEl.parentNode) {
          hitEl.parentNode.removeChild(hitEl);
        }
      }
    });
  }
});