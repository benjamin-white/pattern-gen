import type { DrawScriptType } from '@/hooks/useDraw'

const TAU = Math.PI * 2

const symbol = ({
  ctx,
  cellSize,
  cellPos: [cellX, cellY],
}: {
  ctx: CanvasRenderingContext2D
  cellSize: number
  cellPos: [number, number]
}) => {
  ctx.lineWidth = 6 + Math.floor(Math.random() * 10)
  ctx.beginPath()
  ctx.arc(
    cellX + cellSize * 0.5,
    cellY + cellSize,
    cellSize,
    TAU * 0.5,
    TAU * 0.75,
  )
  ctx.stroke()
  // ctx.beginPath()
  // ctx.arc(cellX + cellSize * 0.5, cellY, cellSize, TAU * 0.75, TAU)
  // ctx.stroke()
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 50
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  let alternate = 0

  ctx.lineCap = 'round'

  for (let i = 0; i < cellsX; i++) {
    alternate++

    for (let j = 0; j < cellsY; j++) {
      if (alternate % 2 !== 0) {
        alternate++
        continue
      }

      symbol({
        ctx,
        cellSize,
        cellPos: [i * cellSize, j * cellSize],
      })

      alternate++
    }
  }
}

export default drawing
