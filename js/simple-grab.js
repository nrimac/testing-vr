AFRAME.registerComponent('simple-grab', {
  init: function () {
    this.grabbedEl = null;
    this.system = this.el.sceneEl.systems.physics;

    // Bind event handlers
    this.onGripDown = this.onGripDown.bind(this);
    this.onGripUp = this.onGripUp.bind(this);

    // Listen for controller buttons (Trigger or Grip)
    this.el.addEventListener('triggerdown', this.onGripDown);
    this.el.addEventListener('gripdown', this.onGripDown);
    this.el.addEventListener('triggerup', this.onGripUp);
    this.el.addEventListener('gripup', this.onGripUp);
  },

  onGripDown: function () {
    // 1. Get the closest object from the sphere-collider
    const collider = this.el.components['sphere-collider'];
    if (!collider || !collider.closestIntersected) return;

    const targetEl = collider.closestIntersected;

    // 2. Only grab elements with the 'grabbable' class
    if (!targetEl.classList.contains('grabbable')) return;

    this.grabbedEl = targetEl;

    // 3. Remove dynamic-body (physics) so it doesn't fight the hand movement
    this.grabbedEl.removeAttribute('dynamic-body');

    // 4. Attach the object to the hand (visual parenting)
    this.el.object3D.attach(this.grabbedEl.object3D);
  },

  onGripUp: function () {
    if (!this.grabbedEl) return;

    // 1. Detach from hand and re-attach to the scene
    this.el.sceneEl.object3D.attach(this.grabbedEl.object3D);

    // 2. Re-enable physics (dynamic-body) so it falls/interacts again
    this.grabbedEl.setAttribute('dynamic-body', 'mass: 0.2; shape: auto');

    this.grabbedEl = null;
  }
});