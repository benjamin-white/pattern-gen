import type { DrawScriptType } from '@/hooks/useDraw'

const symbol = (
  ctx: CanvasRenderingContext2D,
  [x, y]: [number, number],
  cellSize: number,
) => {
  const offset = +(Math.random() * 20).toFixed()

  ctx.beginPath()
  ctx.moveTo(x + offset, y + offset)
  ctx.lineTo(x + cellSize - offset, y + cellSize - offset)
  ctx.stroke()
}

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  const cellSize = 20
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  ctx.lineWidth = 4
  ctx.lineCap = 'round'

  for (let i = -1; i < cellsX; i++) {
    for (let j = -1; j < cellsY; j++) {
      symbol(ctx, [cellSize * j, cellSize * i], cellSize)
    }
  }
}

export default drawing
