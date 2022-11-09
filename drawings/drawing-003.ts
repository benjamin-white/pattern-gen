import type { DrawScriptType } from '../hooks/useDraw'

const symbol = (
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  [cellX, cellY]: [number, number]
) => {

  ctx.beginPath()
  ctx.fillRect(cellX, cellY + 50, cellSize, 50)
  ctx.fillRect(cellX + 50, cellY, 50, cellSize)

}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {

  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  let alternate = 0

  for (let i = 0; i < cellsX; i++) {

    alternate++

    for (let j = 0; j < cellsY; j++) {

      if (alternate % 2 !== 0) {
        alternate++
        continue
      }

      symbol(ctx, cellSize, [i * cellSize, j * cellSize])
      alternate++

    }

  }

}

export default drawing