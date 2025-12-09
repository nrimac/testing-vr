AFRAME.registerComponent('delete-on-contact', {
  init: function () {
    // Listen for the AABB Collider 'hitstart' event
    this.el.addEventListener('hitstart', (evt) => {
      
      // evt.detail.intersectedEls contains all objects touching the bin
      evt.detail.intersectedEls.forEach(hitEl => {
        
        // If the object is trash (grabbable), remove it
        if (hitEl.classList.contains('grabbable')) {
          hitEl.parentNode.removeChild(hitEl);
        }
      });
    });
  }
});