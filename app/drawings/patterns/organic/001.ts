import type { DrawScriptType } from '../../../hooks/useDraw'

const TAU = Math.PI * 2

let flip = false

const symbol = (
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  [cellX, cellY]: [number, number],
) => {
  ctx.beginPath()

  const curveOrigin: [number, number] = [
    cellX + (flip ? cellSize : 0),
    cellY + (flip ? cellSize : 0),
  ]
  const curveLength: [number, number] = [
    TAU * (flip ? 0.5 : 0),
    TAU * (flip ? 0.75 : 0.25),
  ]
  ctx.arc(...curveOrigin, cellSize, ...curveLength)

  ctx.stroke()

  flip = !flip
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 50
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  let alternate = 0

  ctx.lineCap = 'round'
  ctx.lineWidth = 12

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
