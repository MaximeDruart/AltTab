import * as THREE from "three"

export const getExtrudedEllipse = (segments = 64, radius = 4) => {
  // A shape is needed for extrudedGeometry
  const arenaShape = new THREE.Shape()
  arenaShape.autoClose = false

  // use ellipse curve to get an array of points in a circle
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
  const curvePoints = curve.getPoints(segments)

  // haven't found a better method to go from EllipseCurve to Shape
  curvePoints[curvePoints.length - 1].y = 0

  arenaShape.moveTo(curvePoints[0].x, curvePoints[0].y)
  for (let i = 0; i < curvePoints.length; i++) {
    arenaShape.lineTo(curvePoints[i].x, curvePoints[i].y)
  }

  return arenaShape
}

// TOON MATERIAL GRADIENT MAP

const colors = new Uint8Array(3)

for (var c = 0; c <= colors.length; c++) {
  colors[c] = (c / colors.length) * 256
}

const gradientMap = new THREE.DataTexture(colors, colors.length, 1, THREE.LuminanceFormat)
gradientMap.minFilter = THREE.NearestFilter
gradientMap.magFilter = THREE.NearestFilter
gradientMap.generateMipmaps = false

export { gradientMap }
