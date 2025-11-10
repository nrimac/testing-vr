AFRAME.registerComponent("grabbable", {
  init: function () {
    this.grabbing = false;
    this.grabbingHand = null;

    // Bind event handlers to this component instance
    this.onTriggerDown = this.onTriggerDown.bind(this);
    this.onTriggerUp = this.onTriggerUp.bind(this);

    // Listen for trigger press on the object itself
    this.el.addEventListener("mousedown", this.onTriggerDown);
  },

  onTriggerDown: function (evt) {
    if (this.grabbing) {
      return;
    }

    const hand = evt.detail.cursorEl;
    this.grabbing = true;
    this.grabbingHand = hand;

    if (this.el.components.sleepy) {
      this.el.components.sleepy.wakeUp();
    }

    this.el.removeAttribute("dynamic-body");
    this.grabbingHand.object3D.attach(this.el.object3D);
    this.grabbingHand.addEventListener("triggerup", this.onTriggerUp);
  },

  onTriggerUp: function (evt) {
    if (!this.grabbing || !this.grabbingHand) {
      return;
    }

    const sceneEl = this.el.sceneEl;
    const worldPosition = new THREE.Vector3();
    const worldRotation = new THREE.Quaternion();
    const el = this.el; // Store a reference to the element for use in callbacks

    // Get the object's current world position and rotation
    el.object3D.getWorldPosition(worldPosition);
    el.object3D.getWorldQuaternion(worldRotation);

    // Detach from the hand and re-attach to the scene
    sceneEl.object3D.attach(el.object3D);

    // Set the object's position and rotation in the world
    el.object3D.position.copy(worldPosition);
    el.object3D.quaternion.copy(worldRotation);

    // --- Start of the definitive fix ---
    // Defer re-adding the physics body to the next tick to ensure the scene graph is updated.
    setTimeout(() => {
      // Re-add the dynamic-body component to re-enable physics.
      el.setAttribute("dynamic-body", { mass: 0.2 });

      // The physics body is not created instantly. We must wait for the 'body-loaded' event.
      el.addEventListener(
        "body-loaded",
        () => {
          // Now that the physics body exists, reset its velocities.
          // This prevents it from flying off with the hand's last velocity.
          if (el.body) {
            el.body.velocity.set(0, 0, 0);
            el.body.angularVelocity.set(0, 0, 0);
          }
        },
        { once: true } // The listener will automatically remove itself after firing once.
      );
    }, 0);
    // --- End of the definitive fix ---

    // Clean up the listener on the hand
    this.grabbingHand.removeEventListener("triggerup", this.onTriggerUp);

    // Reset state
    this.grabbing = false;
    this.grabbingHand = null;
  },

  // Clean up listeners if the entity is removed
  remove: function () {
    this.el.removeEventListener("mousedown", this.onTriggerDown);
    if (this.grabbingHand) {
      this.grabbingHand.removeEventListener("triggerup", this.onTriggerUp);
    }
  },
});
