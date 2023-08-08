import { range } from 'radash'
import type { DrawScriptType } from '../../hooks/useDraw'

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

      ctx.fillStyle = '#96cbc0'
      ctx.fillRect(
        bounds.x.min + i * cellSize,
        bounds.y.min + j * cellSize,
        cellSize,
        cellSize,
      )

      symbol(ctx, cellSize, [
        bounds.x.min + i * cellSize,
        bounds.y.min + j * cellSize,
      ])
    }
  }
}

// outline. bg. pattern[params.]

const drawCircle = (ctx: CanvasRenderingContext2D, radius: number) => {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, TAU)
  ctx.stroke()
}

const angle = TAU / 6

type WithClip = {
  ctx: CanvasRenderingContext2D
  location: { x: number; y: number }
  radius: number
  drawClip: (ctx: CanvasRenderingContext2D, radius: number) => void
  drawClipped: (ctx: CanvasRenderingContext2D, radius: number) => void
}

const withClip = ({
  ctx,
  location,
  radius,
  drawClip,
  drawClipped,
}: WithClip) => {
  ctx.save()
  ctx.translate(location.x, location.y)
  drawClip(ctx, radius)
  ctx.clip()
  ctx.fillRect(radius * -1, radius * -1, radius * 2, radius * 2)
  drawClipped(ctx, radius)
  ctx.restore()
}

const drawRandomHexagon = (ctx: CanvasRenderingContext2D, radius: number) => {
  ctx.beginPath()
  for (const i of range(0.5, 5.5)) {
    ctx.lineTo(
      radius * Math.random() * Math.cos(angle * i),
      radius * Math.random() * Math.sin(angle * i),
    )
  }
  ctx.closePath()
  ctx.stroke()
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  ctx.fillStyle = 'rgba(0, 0, 0, .05)'
  ctx.fillRect(0, 0, sizeX, sizeY)
  ctx.fillStyle = '#fff'
  withClip({
    drawClip: drawCircle,
    drawClipped: (ctx, radius) =>
      drawPattern(ctx, {
        x: { min: radius * -1, max: radius },
        y: { min: radius * -1, max: radius },
      }),
    ctx,
    location: {
      x: sizeX * 0.5,
      y: sizeY * 0.5,
    },
    radius: sizeX * 0.42,
  })
  withClip({
    drawClip: drawRandomHexagon,
    drawClipped: (ctx, radius) => {
      ctx.fillStyle = 'pink'
      ctx.fillRect(radius * -1, radius * -1, radius * 2, radius * 2)
    },
    ctx,
    location: {
      x: sizeX * 0.5,
      y: sizeY * 0.5,
    },
    radius: sizeX * 0.42,
  })
}

export default drawing
