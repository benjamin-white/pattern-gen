import type { DrawScriptType } from '../hooks/useDraw'
import { loopCells } from '../helpers/utils/loopCells'
import Noise, { Grad } from '../helpers/utils/noise'

const getNoiseValue = new Noise(Grad)

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {

  const cellSize = 30
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  ctx.lineWidth = 6
  ctx.lineCap = 'round'

  loopCells(ctx, cellsX, cellsY, cellSize, symbol)

}

const symbol: CellSymbol = ({
  ctx,
  cells: [x, y],
  cellSize,
}) => {
  // const noise = getNoiseValue.perlin2(x * .46, y * .006);
  const noise = getNoiseValue.simplex2(x * .004, y * .009);
  // if (Math.random() > .9) return;
  if (getNoiseValue.perlin2(x * .009, y * .009) > 0 || Math.random() > .8) return;
  // const direction = Math.random() > .5 ? 1 : 0

  ctx.beginPath()
  ctx.moveTo(x + (noise > .4 ? cellSize : 0), y)
  ctx.lineTo(x + (noise > -.4 ? 0 : cellSize), y + cellSize)
  ctx.stroke()

}

export default drawing