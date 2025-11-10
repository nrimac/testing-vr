AFRAME.registerComponent("grabbable", {
  init: function () {
    this.grabbing = false;
    this.grabbingHand = null;

    this.onTriggerDown = this.onTriggerDown.bind(this);
    this.onTriggerUp = this.onTriggerUp.bind(this);

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

    this.el.object3D.getWorldPosition(worldPosition);
    this.el.object3D.getWorldQuaternion(worldRotation);

    sceneEl.object3D.attach(this.el.object3D);

    this.el.object3D.position.copy(worldPosition);
    this.el.object3D.quaternion.copy(worldRotation);

     setTimeout(() => {
      el.setAttribute("dynamic-body", { mass: 0.2 });
    }, 0);

    this.grabbingHand.removeEventListener("triggerup", this.onTriggerUp);

    this.grabbing = false;
    this.grabbingHand = null;
  },

  remove: function () {
    this.el.removeEventListener("mousedown", this.onTriggerDown);
    if (this.grabbingHand) {
      this.grabbingHand.removeEventListener("triggerup", this.onTriggerUp);
    }
  },
});
