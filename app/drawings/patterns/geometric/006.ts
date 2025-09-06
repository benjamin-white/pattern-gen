// import { displacementFromImage, fit, scatterPoints } from "../helpers";
import type { DrawScriptType } from '@/hooks/useDraw'
import {
  Noise,
  Grad,
  displacementFromImage,
  fit,
  scatterPoints,
} from '@arklo/toolbox'

const getNoiseValue = new Noise(Grad)

const PARAMETERS = {
  SAMPLING_THRESHOLD_LOW: 15,
  SYMBOL_SIZE: 30,
  SYMBOL_SCALE_FALLOFF: 1.75,
}

const symbolA = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  value: number,
) => {
  const size = PARAMETERS.SYMBOL_SIZE
  const scale = Math.pow(value / 255, PARAMETERS.SYMBOL_SCALE_FALLOFF)
  const offset = scale * 0.5
  ctx.beginPath()
  ctx.fillStyle = `rgba(${value}, ${value}, ${value})`
  ctx.arc(x - offset, y - offset, size * scale, 0, 2 * Math.PI)
  ctx.fill()
}

const symbolB = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  value: number,
) => {
  let noise = fit(getNoiseValue.perlin2(x, y), -1, 1, 0, 1)
  noise = Math.pow(noise, 4) * 12 + 2
  const size = PARAMETERS.SYMBOL_SIZE * noise
  const scale = Math.pow(value / 255, PARAMETERS.SYMBOL_SCALE_FALLOFF)
  const offset = scale * noise
  ctx.strokeStyle = `rgba(${value}, ${value}, ${value})`
  ctx.lineWidth = size * scale * 0.5
  ctx.beginPath()
  ctx.moveTo(
    x - offset - Math.ceil(Math.random() * 10),
    y - offset - Math.ceil(Math.random() * 10),
  )
  ctx.lineTo(
    x + offset + Math.ceil(Math.random() * 10),
    y + offset + Math.ceil(Math.random() * 10),
  )
  ctx.moveTo(
    x + offset + Math.ceil(Math.random() * 10),
    y - offset - Math.ceil(Math.random() * 10),
  )
  ctx.lineTo(
    x - offset - Math.ceil(Math.random() * 10),
    y + offset + Math.ceil(Math.random() * 10),
  )
  ctx.moveTo(x, y - offset - Math.ceil(Math.random() * 10))
  ctx.lineTo(x, y + offset + Math.ceil(Math.random() * 10))
  ctx.stroke()
}

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  const debugDispInput = (imageData: number[]) => {
    for (let i = 1; i < cellsX; i++) {
      for (let j = 1; j < cellsY; j++) {
        symbolA(ctx, cellSize * j, cellSize * i, imageData[i + sizeX * j])
      }
    }
    ctx.fillStyle = 'rgba(255, 255, 255, .6)'
    ctx.fillRect(0, 0, sizeX, sizeY)
  }

  const cellSize = 1
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  const dispPoints = (await displacementFromImage(
    '/assets/portrait.png',
    sizeX,
    sizeY,
  )) as number[]
  const calcDist = (coords: [number, number], exponent = 3.3) => {
    const rawDist =
      dispPoints[Math.floor(coords[0]) + Math.floor(coords[1]) * sizeX] / 5000
    return rawDist < 0.05
      ? rawDist - Math.random() * 0.01
      : rawDist + Math.random() * 1
  }

  const points = scatterPoints({
    shape: [sizeX, sizeY],
    minDistance: PARAMETERS.SAMPLING_THRESHOLD_LOW,
    distanceFunction: calcDist,
  })
  points.forEach(([x, y]: [number, number]) => {
    symbolA(
      ctx,
      Math.floor(x),
      Math.floor(y),
      dispPoints[Math.floor(x) + sizeX * Math.floor(y)],
    )
    // symbolB(
    //   ctx,
    //   Math.floor(x),
    //   Math.floor(y),
    //   dispPoints[Math.floor(x) + sizeX * Math.floor(y)],
    // )
  })
}

export default drawing
