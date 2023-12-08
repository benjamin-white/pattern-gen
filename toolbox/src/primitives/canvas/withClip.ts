type WithClipConfig = {
  ctx: CanvasRenderingContext2D
  radius: number
}

const withClip = (
  { ctx, radius }: WithClipConfig,
  drawClip: (ctx: CanvasRenderingContext2D, radius: number) => void,
  drawClipped: (ctx: CanvasRenderingContext2D, radius: number) => void,
) => {
  drawClip(ctx, radius)
  ctx.clip()
  drawClipped(ctx, radius)
}

export default withClip
