AFRAME.registerComponent("grabbable", {
  init: function () {
    this.grabbing = false;
    this.grabbingHand = null;

    // Bind event handlers to this component instance
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // Listen for trigger press on the object itself
    this.el.addEventListener("mousedown", this.onMouseDown);
  },

  onMouseDown: function (evt) {
    // Prevent grabbing if already held
    if (this.grabbing) { return; }

    // Get the controller that triggered the event
    const hand = evt.detail.cursorEl;
    this.grabbing = true;
    this.grabbingHand = hand;

    // Temporarily disable physics by removing the dynamic-body while grabbing
    this.el.removeAttribute("dynamic-body");

    // Attach the object to the grabbing hand
    this.grabbingHand.object3D.attach(this.el.object3D);

    // Listen for the trigger release on the scene to ensure it's caught
    this.el.sceneEl.addEventListener("mouseup", this.onMouseUp);
  },

  onMouseUp: function (evt) {
    // Ensure we are in a grabbing state
    if (!this.grabbing || !this.grabbingHand) { return; }
    
    const sceneEl = this.el.sceneEl;
    const worldPosition = new THREE.Vector3();
    const worldRotation = new THREE.Quaternion();

    // Get the object's current world position and rotation
    this.el.object3D.getWorldPosition(worldPosition);
    this.el.object3D.getWorldQuaternion(worldRotation);

    // Detach from the hand and re-attach to the scene
    sceneEl.object3D.attach(this.el.object3D);
    
    // Set the object's position and rotation in the world
    this.el.object3D.position.copy(worldPosition);
    this.el.object3D.quaternion.copy(worldRotation);

    // Re-enable physics by adding the dynamic-body component back
    this.el.setAttribute("dynamic-body", { mass: 0.2 });

    // Reset state and clean up the listener
    this.grabbing = false;
    this.grabbingHand = null;
    this.el.sceneEl.removeEventListener("mouseup", this.onMouseUp);
  },
  
  // Clean up listeners if the entity is removed
  remove: function() {
    this.el.removeEventListener("mousedown", this.onMouseDown);
    this.el.sceneEl.removeEventListener("mouseup", this.onMouseUp);
  }
});