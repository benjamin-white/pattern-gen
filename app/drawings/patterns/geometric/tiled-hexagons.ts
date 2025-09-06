import { normal, TAU } from '@arklo/toolbox'
import type { DrawScriptType } from '../../../hooks/useDraw'

const toRadians = (angle: number) => angle * (Math.PI / 180)

const hexagon = (
  ctx: CanvasRenderingContext2D,
  origin: { x: number; y: number },
  radius: number,
) => {
  const POINTS = 6
  const step = TAU / POINTS
  let angle = step * 0.5

  ctx.beginPath()

  for (let i = 0; i < POINTS; i++) {
    ctx.lineTo(
      origin.x + radius * Math.cos(angle),
      origin.y + radius * Math.sin(angle),
    )
    angle += step
  }

  ctx.fillStyle = 'rgba(0 0 255 / .05)'
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

const CELL_HEIGHT = 40

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const r = CELL_HEIGHT / 2
  const wrapAround = 1
  // bottom external right angle
  const offsetY = Math.sin(toRadians(30)) * r
  // horizontal center internal right angle
  const halfWidth = Math.sin(toRadians(60)) * r
  const cellWidth = halfWidth * 2
  const cellsX = sizeX / cellWidth + wrapAround
  const cellsY = ~~(sizeY / (CELL_HEIGHT - offsetY)) + wrapAround

  for (let i = 0; i < cellsX; i++) {
    for (let j = -1; j < cellsY; j++) {
      // const hexagonInset = ~~(Math.random() * cellWidth * 0.2) - 1
      hexagon(
        ctx,
        {
          // offset every other row by half a cell's width
          x: i * cellWidth + (j % 2 === 0 ? 0 : halfWidth),
          y: j * CELL_HEIGHT + r - offsetY * j,
        },
        r - ~~(Math.random() * cellWidth * 0.2) - 1,
      )
    }
  }
}

export default drawing
