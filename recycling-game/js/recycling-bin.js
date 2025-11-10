AFRAME.registerComponent("recycling-bin", {
  schema: {
    type: { type: "string" },
  },

  init: function () {
    this.el.addEventListener("collide", (e) => {
      const collidedEl = e.detail.body.el;

      if (
        collidedEl.classList.contains("recyclable") &&
        collidedEl.dataset.type === this.data.type
      ) {
        collidedEl.parentNode.removeChild(collidedEl);
      }
    });
  },
});
