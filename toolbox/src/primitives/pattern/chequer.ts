import type { Pattern } from './types'

type Chequer = {
  config?: {
    cellSize?: number
    colorOne?: string
    colorTwo?: string
  }
}

const chequer = ({
  ctx,
  bbox,
  config: { cellSize = 50, colorOne = '#fff', colorTwo = '#000' } = {},
}: Pattern & Chequer) => {
  const sizeX = Math.abs(bbox.x.min) + bbox.x.max
  const sizeY = Math.abs(bbox.y.min) + bbox.y.max
  const cellsX = Math.ceil(sizeX / cellSize)
  const cellsY = Math.ceil(sizeY / cellSize)
  let alternate = 0

  ctx.fillStyle = colorOne
  ctx.fillRect(sizeX * 0.5 * -1, sizeY * 0.5 * -1, sizeX, sizeY)
  ctx.fillStyle = colorTwo

  for (let i = 0; i < cellsX; i++) {
    if (cellsX % 2 === 0) {
      alternate++
    }

    for (let j = 0; j < cellsY; j++) {
      alternate++
      if (alternate % 2 === 0) {
        continue
      }

      ctx.fillRect(
        bbox.x.min + i * cellSize,
        bbox.y.min + j * cellSize,
        cellSize,
        cellSize,
      )
    }
  }
}

export default chequer
