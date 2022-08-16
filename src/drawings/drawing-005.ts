import type { DrawScriptType } from '../hooks/useDraw'

// TODO:

// + oversample area for seamless edges
// + use noise for distribution instead of random

const TAU = Math.PI * 2

const symbol = ({
  ctx,
  cellSize,
  cellPos: [cellX, cellY],
  strokeWidth,
  dotScale
}: {
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  cellPos: [number, number],
    strokeWidth: number,
  dotScale: number
}
) => {

  ctx.lineWidth = strokeWidth

  ctx.beginPath()

  const flip = cellY % 200 === 0

  const curveOrigin:
    [number, number] = [cellX + (flip ? cellSize : 0), cellY + (flip ? cellSize : 0)]
  const curveLength:
    [number, number] = [TAU * (flip ? .5 : 0), TAU * (flip ? .75 : .25)]
  ctx.arc(...curveOrigin, cellSize, ...curveLength)

  ctx.stroke()

  if (flip) {
    ctx.beginPath()
    ctx.arc(
      cellX + cellSize,
      cellY + cellSize,
      6 + dotScale + Math.floor(Math.random() * 10),
      0,
      TAU
    )
    ctx.fill()
  }

}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {

  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  let alternate = 0

  const lineCount = new Array(cellsX).fill(0)
  let lineWidths = lineCount.map(() => Math.floor(Math.random() * 50 + 10))
  ctx.lineCap = 'round'

  const gridStep = () => {
    lineWidths = lineWidths.slice(1, lineWidths.length).concat(lineWidths[0])
    alternate++
  }

  for (let i = 0; i < cellsX; i++) {

    alternate++

    for (let j = 0; j < cellsY; j++) {

      if (alternate % 2 !== 0) {
        gridStep()
        continue
      }

      const dotScale = (lineWidths[i] + (lineWidths[i + 1] ?? 0)) / 2

      symbol({
        ctx,
        cellSize,
        cellPos: [i * cellSize, j * cellSize],
        strokeWidth: lineWidths[i],
        dotScale
      })

      gridStep()

    }

  }

  // backfill col0
  for (let j = 0; j < cellsY; j = j + 2) {
    ctx.beginPath()
    ctx.arc(0, j * cellSize + cellSize, 24 + Math.floor(Math.random() * 10), 0, TAU)
    ctx.fill()
  }

}

export default drawing