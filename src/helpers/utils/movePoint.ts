type Vec2d = {
  x: number;
  y: number;
}

export const movePoint = (p1: Vec2d, p2: Vec2d, dist: number) => {
  return {
    x: p1.x + (p2.x - p1.x) * dist,
    y: p1.y + (p2.y - p1.y) * dist
  }
}