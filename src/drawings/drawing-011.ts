import { range } from 'radash'
import { fit } from '../helpers'
import type { DrawScriptType } from '../hooks/useDraw'

const TAU = Math.PI * 2

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {

  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.fillStyle = '#FFF'
  ctx.fillRect(0, 0, sizeX, sizeY)

  for (const i of range(-1, cellsX)) {
    for (const j of range(-1, cellsY)) {
      const scale = cellSize * fit(+Math.random().toFixed(1), 0, 1, .1, .9)
      ctx.lineWidth = scale / 20
      hexagon(
        ctx,
        [cellSize * j + cellSize * .5, cellSize * i + cellSize * .5],
        cellSize * .25
      )
    }
  }

}

const hexagon = (
  ctx: CanvasRenderingContext2D,
  [cellX, cellY]: [number, number],
  radius: number
) => {

  const angle = TAU / 6;

  ctx.beginPath()

  // draw perimeter
  for (const i of range(.5, 6.5)) {
    ctx.lineTo(cellX + radius * Math.cos(angle * i), cellY + radius * Math.sin(angle * i))
  }

  ctx.closePath()
  ctx.fill()

  // draw inner sides
  for (const i of range(1.5, 6.5, 2)) {
    ctx.moveTo(cellX, cellY)
    ctx.lineTo(cellX + radius * Math.cos(angle * i), cellY + radius * Math.sin(angle * i))
  }

  if (Math.random() > .5) {
    hexagonHatch(ctx, [cellX, cellY], radius, angle)
  }

  ctx.stroke()

}

const hexagonHatch = (
  ctx: CanvasRenderingContext2D,
  [cellX, cellY]: [number, number],
  radius: number,
  angle: number
) => {

  // vars = hatchCount, hatchDirection (vertical, horizontal, diagonal (complex))

  const hatchDist = radius / 3
  const nx = cellX + hatchDist * Math.cos(angle * 1.5)
  const ny = cellY + hatchDist * Math.sin(angle * 1.5)
  ctx.moveTo(nx, ny)
  ctx.lineTo(nx + radius * Math.cos(angle * 5.5), ny + radius * Math.sin(angle * 5.5))

  const tx = cellX + hatchDist * 2 * Math.cos(angle * 1.5)
  const ty = cellY + hatchDist * 2 * Math.sin(angle * 1.5)
  ctx.moveTo(tx, ty)
  ctx.lineTo(tx + radius * Math.cos(angle * 5.5), ty + radius * Math.sin(angle * 5.5))

  const hatchDist2 = radius / 4
  const px = cellX + hatchDist2 * Math.cos(angle * 3.5)
  const py = cellY + hatchDist2 * Math.sin(angle * 3.5)
  ctx.moveTo(px, py)
  ctx.lineTo(px + radius * Math.cos(angle * 5.5), py + radius * Math.sin(angle * 5.5))

  const hx = cellX + hatchDist2 * 2 * Math.cos(angle * 3.5)
  const hy = cellY + hatchDist2 * 2 * Math.sin(angle * 3.5)
  ctx.moveTo(hx, hy)
  ctx.lineTo(hx + radius * Math.cos(angle * 1.5), hy + radius * Math.sin(angle * 1.5))

  const rx = cellX + hatchDist2 * 3 * Math.cos(angle * 3.5)
  const ry = cellY + hatchDist2 * 3 * Math.sin(angle * 3.5)
  ctx.moveTo(rx, ry)
  ctx.lineTo(rx + radius * Math.cos(angle * 1.5), ry + radius * Math.sin(angle * 1.5))

}

export default drawing