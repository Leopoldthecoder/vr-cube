// map six sides (directions) to three coordinate axises
const DIR_MAP_TO_AXIS = {
  'u': 'y',
  'd': 'y',
  'l': 'x',
  'r': 'x',
  'f': 'z',
  'b': 'z'
}

// offsets from center point of six sides
const DIR_OFFSET = {
  'u': 1,
  'd': -1,
  'l': -1,
  'r': 1,
  'f': 1,
  'b': -1
}

const blocks = document.querySelectorAll('a-box')

const getTargetBlocks = (dir, axis) => {
  return Array.prototype.filter.call(blocks, block => {
    const targetCoor = centerCoor[axis] + DIR_OFFSET[dir]
    return block.getAttribute('position')[axis] === targetCoor
  })
}

const generateRotation = dir => {
  return () => {
    const axis = DIR_MAP_TO_AXIS[dir]
    const blocks = getTargetBlocks(dir, axis)
    const deg = axis === 'x'
      ? '360 0 0'
      : (axis === 'y' ? '0 360 0' : '0 0 360')
    blocks.forEach(block => {
      block.setAttribute('rotation', {
        x: 0,
        y: 0,
        z: 0
      })

      block.setAttribute('pivot-point', {
        x: (axis === 'x' ? 0 : centerCoor.x - block.getAttribute('position').x),
        y: (axis === 'y' ? 0 : centerCoor.y - block.getAttribute('position').y),
        z: (axis === 'z' ? 0 : centerCoor.z - block.getAttribute('position').z)
      })

      const oldAnimation = block.getElementsByTagName('a-animation')[0]
      if (oldAnimation) {
        block.removeChild(oldAnimation)
      }

      const animation = document.createElement('a-animation')
      animation.setAttribute('attribute', 'rotation')
      animation.setAttribute('dur', 1500)
      animation.setAttribute('repeat', 0)
      animation.setAttribute('to', deg)
      block.appendChild(animation)
    })
  }
}

const U = generateRotation('u')
const R = generateRotation('r')
const F = generateRotation('f')
const L = generateRotation('l')
const D = generateRotation('d')
const B = generateRotation('b')
const Rotate = { U, R, F, L, D, B }
