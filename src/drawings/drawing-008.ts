import { displacementFromImage } from '../helpers'
import type { DrawScriptType } from '../hooks/useDraw'

// currently just reads and writes back an image
// TODO: scatter points by grayscale density (Poisson sampling)
// TODO: voronoi or 'nearest neighbour' connect points
// TODO: best fit scale input image to target canvas size

const symbol = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  value: number
) => {
  ctx.beginPath()
  ctx.fillStyle = `rgba(${value}, ${value}, ${value})`
  ctx.fillRect(x, y, 1, 1)
}

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {

  const cellSize = 1
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  const dispPoints = await displacementFromImage('./src/assets/torus2.png', sizeX, sizeY) as number[]

  for (let i = 1; i < cellsX; i++) {
    for (let j = 1; j < cellsY; j++) {
      symbol(ctx, cellSize * j, cellSize * i, dispPoints[i + sizeX * j])
    }
  }

}

export default drawing