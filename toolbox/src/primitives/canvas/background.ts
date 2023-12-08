const background = (ctx: CanvasRenderingContext2D, color: string) => {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = '#fff'
}

export default background
