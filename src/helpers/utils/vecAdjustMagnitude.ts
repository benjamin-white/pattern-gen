export const vecAdjustMagnitude = (vec2d: Vec2d, scaleBy: Vec2d) => {
  const currentMagnitude = Math.sqrt(vec2d.x * vec2d.x + vec2d.y * vec2d.y)
  if (!currentMagnitude) return vec2d
  return {
    x: vec2d.x * (currentMagnitude * scaleBy.x) / currentMagnitude,
    y: vec2d.y * (currentMagnitude * scaleBy.y) / currentMagnitude
  }
}