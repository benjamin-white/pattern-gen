import { TAU } from '../../constants'
import type { Pattern } from './types'

const pallete1 = ['#cbffe3', '#000', '#fff']

type Dots = {
  config?: {
    cellSize?: number
    scale?: number
    scaleBy?: 'random' | 'noise' // gaussian
    // color by noise?
    // col
    // stroke?:
    // scale by noise?
    // amplitide / falloff (scale)
    // scaleBy Grdient?
    // random stroke width ?
  }
}

const drawing = ({
  ctx,
  bbox,
  config: { cellSize = 30, scale = 20, scaleBy } = {},
}: Pattern & Dots) => {
  const sizeX = Math.abs(bbox.x.min) + bbox.x.max
  const sizeY = Math.abs(bbox.y.min) + bbox.y.max
  let cellsX = Math.ceil(sizeX / cellSize)
  let cellsY = Math.ceil(sizeY / cellSize)
  if (cellsX % 2 !== 0) cellsX++
  if (cellsY % 2 !== 0) cellsY++
  let alternate = 0

  // ctx.lineWidth = 4
  // // ctx.fillStyle = pallete1[0]

  for (let i = 0; i < cellsX; i++) {
    alternate++

    for (let j = 0; j < cellsY; j++) {
      if (alternate % 2 !== 0) {
        alternate++
        continue
      }

      const margin = Math.floor(Math.random() * 10) + 20
      // const radius = (cellSize - margin) * 0.5
      const cellCenter = {
        x: bbox.x.min + (i * cellSize + cellSize * 0.5),
        y: bbox.y.min + (j * cellSize + cellSize * 0.5),
      }

      ctx.beginPath()
      ctx.arc(
        cellCenter.x,
        cellCenter.y,
        scale * (scaleBy === 'random' ? Math.pow(Math.random(), 0.4) : 1),
        0,
        TAU,
      )
      ctx.fill()
      ctx.stroke()
      ctx.closePath()

      alternate++
    }
  }
}

export default drawing
