import type { DrawScriptType } from '@/hooks/useDraw'

const INITIAL_TILE_SIZE = 400
const RECURSIVE_DEPTH = 6

const tileLines = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tileSize: number,
  depth: number,
) => {
  if (depth === 0) {
    if (Math.random() < 0.5) {
      ctx.beginPath()
      ctx.moveTo(x - tileSize, y + tileSize)
      ctx.lineTo(x + tileSize, y - tileSize)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.moveTo(x - tileSize, y - tileSize)
      ctx.lineTo(x + tileSize, y + tileSize)
      ctx.stroke()
    }
  } else {
    tileSize *= 0.5
    depth -= 1
    tileLines(ctx, x - tileSize, y + tileSize, tileSize, depth)
    tileLines(ctx, x + tileSize, y + tileSize, tileSize, depth)
    tileLines(ctx, x - tileSize, y - tileSize, tileSize, depth)
    tileLines(ctx, x + tileSize, y - tileSize, tileSize, depth)
  }
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  tileLines(
    ctx,
    INITIAL_TILE_SIZE,
    INITIAL_TILE_SIZE,
    INITIAL_TILE_SIZE,
    RECURSIVE_DEPTH,
  )
}

export default drawing
