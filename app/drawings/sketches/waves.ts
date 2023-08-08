import { range } from 'radash'
import type { DrawScriptType } from '../../hooks/useDraw'

const TAU = Math.PI * 2
const angle = TAU / 6
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

interface DrawPattern {
  (
    ctx: CanvasRenderingContext2D,
    bounds: Record<'x' | 'y', { min: number; max: number }>,
  ): void
}

const drawPattern: DrawPattern = (ctx, bounds) => {
  const sizeX = Math.abs(bounds.x.min) + bounds.x.max
  const sizeY = Math.abs(bounds.y.min) + bounds.y.max
  const cellSize = 50
  const cellsX = Math.ceil(sizeX / cellSize)
  const cellsY = Math.ceil(sizeY / cellSize)

  ctx.lineCap = 'round'
  ctx.lineWidth = 1

  let alternate = 0
  for (let i = 0; i < cellsX; i++) {
    if (cellsX % 2 === 0) {
      alternate++
    }

    for (let j = 0; j < cellsY; j++) {
      alternate++
      if (alternate % 2 === 0) {
        continue
      }

      symbol(ctx, cellSize, [
        bounds.x.min + i * cellSize,
        bounds.y.min + j * cellSize,
      ])
    }
  }
}

// block-color, gradient, texture?, offset and pattern options
const drawWave = (
  ctx: CanvasRenderingContext2D,
  location: { x: number; y: number },
  radius: number,
) => {
  ctx.save()
  ctx.translate(location.x, location.y)
  ctx.fillRect(radius * -1, radius * -1, radius * 2, radius * 2)
  drawPattern(ctx, {
    x: { min: radius * -1, max: radius },
    y: { min: radius * -1, max: radius },
  })
  ctx.restore()
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  ctx.fillStyle = 'rgba(0, 0, 0, .05)'
  ctx.fillRect(0, 0, sizeX, sizeY)
  ctx.fillStyle = 'rgba(0, 0, 0, .9)'
  ctx.fillRect(sizeX * 0.6, sizeY * 0.23, sizeX * 0.2, sizeY * 0.1)
  ctx.fillStyle = '#fff'
  drawWave(ctx, { x: sizeX * 0.5, y: sizeY * 0.5 }, sizeX * 0.2)
}

export default drawing
