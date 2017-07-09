const extendDeep = AFRAME.utils.extendDeep
const meshMixin = AFRAME.primitives.getMeshMixin()

AFRAME.registerPrimitive('a-sticker', extendDeep({}, meshMixin, {
  defaultComponents: {
    geometry: {
      primitive: 'plane',
      width: 0.9,
      height: 0.9
    },
    material: {
      side: 'double'
    }
  }
}));