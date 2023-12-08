type Polygon = {
  ctx: CanvasRenderingContext2D
  points: [number, number][]
}

const polygon = ({ ctx, points }: Polygon) => {
  ctx.beginPath()
  for (const [x, y] of points) {
    ctx.lineTo(x, y)
  }
  ctx.closePath()
}

export default polygon
