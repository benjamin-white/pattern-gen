type Vec2 = {
  x: number
  y: number
}

export const vecAdjustMagnitude = (vec2d: Vec2, scaleBy: number) => ({
  x: vec2d.x * scaleBy,
  y: vec2d.y * scaleBy,
})
