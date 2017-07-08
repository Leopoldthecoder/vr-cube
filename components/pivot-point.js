AFRAME.registerComponent('pivot-point', {
  dependencies: ['position'],

  schema: { type: 'vec3' },

  update: function(oldData) {
    const originalPosition = new THREE.Vector3()
    const originalRotation = new THREE.Vector3()
    const data = oldData
      ? {
        x: this.data.x - oldData.x,
        y: this.data.y - oldData.y,
        z: this.data.z - oldData.z
      }
      : this.data
    const el = this.el
    const originalParent = el.object3D.parent
    const originalGroup = el.object3D
    const outerGroup = new THREE.Group()

    originalPosition.copy(originalGroup.position)
    originalRotation.copy(originalGroup.rotation)

    // Detach current group from parent.
    originalParent.remove(originalGroup)
    outerGroup.add(originalGroup)

    // Set new group as the outer group.
    originalParent.add(outerGroup)

    // Set outer group as new object3D.
    el.object3D = outerGroup

    // Apply pivot to original group.
    originalGroup.position.set(-1 * data.x, -1 * data.y, -1 * data.z)

    // Offset the pivot so that world position not affected.
    // And restore position onto outer group.
    outerGroup.position.set(data.x + originalPosition.x, data.y + originalPosition.y, data.z + originalPosition.z)

    // Transfer rotation to outer group.
    outerGroup.rotation.copy(originalGroup.rotation)
    originalGroup.rotation.set(0, 0, 0)
  }
})
