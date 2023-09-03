// import { range } from 'radash'
import {
  displacementFromImage,
  randomiseObject,
  scatterPoints,
  Delaunay,
} from '@arklo/toolbox'
import type { DrawScriptType } from '../../hooks/useDraw'

const { random } = Math

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  // const palette = randomiseObject(
  //   palettes[Math.floor(random() * palettes.length)],
  // )
  // const dispMap = dispMaps[Math.floor(random() * dispMaps.length)]

  const dispPoints = await displacementFromImage(
    '/assets/torus.png',
    // '/assets/portrait.png',
    sizeX,
    sizeY,
  )

  // const calcDist = (coords, exponent = 3.3) => {
  //   const rawDist = Math.pow(
  //     dispPoints[Math.floor(coords[0]) + Math.floor(coords[1]) * sizeX],
  //     exponent,
  //   )
  //   return rawDist < 0.05
  //     ? rawDist - random() * 0.01
  //     : rawDist + random() * 0.01
  // }

  // const points = scatterPoints({
  //   shape: [sizeX, sizeY],
  //   distanceFunction: calcDist,
  // }) // must use fxhash RNG

  const calcDist = (coords: [number, number], exponent = 3.3) => {
    const rawDist =
      dispPoints[Math.floor(coords[0]) + Math.floor(coords[1]) * sizeX] / 5000
    return rawDist < 0.05
      ? rawDist - Math.random() * 0.01
      : rawDist + Math.random() * 1
  }

  const points = scatterPoints({
    shape: [sizeX, sizeY],
    // minDistance: PARAMETERS.SAMPLING_THRESHOLD_LOW,
    minDistance: 5,
    distanceFunction: calcDist,
  })

  const delaunay = Delaunay.from(points)
  const voronoi = delaunay.voronoi([0.5, 0.5, sizeX - 0.5, sizeY - 0.5])

  console.log(points)

  // ctx.fillStyle = palette.tertiary
  // ctx.fillStyle = '#fff'
  // ctx.fillRect(0, 0, sizeX, sizeY)

  // ctx.fillStyle = palette.secondary+'46';
  // // 'gather/create cells'
  // [6, 12, 56, 99, 134, 162].forEach(i => {
  //   voronoi.renderCell(i, ctx)
  // })
  // ctx.fill()

  ctx.beginPath()
  voronoi.delaunay.hull = [
    [-1000, -1000],
    [1000, 1000],
  ]
  voronoi.render(ctx)
  // ctx.strokeStyle = palette.primary
  ctx.strokeStyle = '#000'
  ctx.stroke()
}

export default drawing
