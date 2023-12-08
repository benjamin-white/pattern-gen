type WithOriginConFig = {
  ctx: CanvasRenderingContext2D
  location: [number, number]
  rotation: number
}

const withOrigin = (
  { ctx, location, rotation }: WithOriginConFig,
  drawFunc: () => void,
) => {
  ctx.save()
  ctx.translate(location[0], location[1])
  ctx.rotate(rotation)
  drawFunc()
  ctx.restore()
}

export default withOrigin
