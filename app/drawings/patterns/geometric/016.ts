import type { Pattern } from './types'
import { TAU } from '../../constants'

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

type Waves = {
  config?: {
    // distribution?: any
    // orientation?: any // xyz * xyz
    cellSize?: number
  }
}

/**
 * To support "orientation", could be a continuous arc or rotation
 * To support (gradient) distribution
 */
const waves = ({
  ctx,
  bbox,
  config: { cellSize = 50 } = {},
}: Pattern & Waves) => {
  const sizeX = Math.abs(bbox.x.min) + bbox.x.max
  const sizeY = Math.abs(bbox.y.min) + bbox.y.max
  let cellsX = Math.ceil(sizeX / cellSize)
  let cellsY = Math.ceil(sizeY / cellSize)
  if (cellsX % 2 === 0) cellsX++
  if (cellsY % 2 === 0) cellsY++

  ctx.lineCap = 'round'
  let alternate = 0
  for (let y = 0; y < cellsY; y++) {
    if (cellsY % 2 === 0) {
      alternate++
    }

    for (let x = 0; x < cellsX; x++) {
      alternate++

      if (alternate % 2 === 0) {
        continue
      }

      symbol(ctx, cellSize, [
        bbox.x.min + x * cellSize,
        bbox.y.min + y * cellSize,
      ])
    }
  }
}

export default waves
