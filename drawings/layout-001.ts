import type { DrawScriptType } from '../hooks/useDraw'
import gaussian from '../helpers/utils/gaussian'
import { clamp, normalRange } from '../helpers'

const drawParagraph = (
  ctx: CanvasRenderingContext2D,
  [x, y]: [number, number],
  cellSize: number,
  lineCount: number,
) => {

  const lineLength = {
    rand: () => +Math.random().toFixed(1),
    gauss: () => gaussian({ mean: 0, dev: 1 }),
    clamped: () => clamp(gaussian({ mean: .8, dev: .1 }), .1, 1)
  }

  normalRange(lineCount).forEach((num, idx) => {    
    if (idx + 1 === lineCount) return
    ctx.fillRect(
      x * cellSize,
      y * cellSize - cellSize * num,
      cellSize * 2.75 * lineLength.rand(),
      1
    )
  })

}

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {

  const cellSize = 20
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  ctx.lineCap = 'round'
  
  for (let i = 1; i < cellsX; i += 3) {
    for (let j = 1; j < cellsY + 1; j++) {
      if (Math.random() > .96 || j % 5 === 0) continue
      drawParagraph(ctx, [i, j], cellSize, 6)
    }
  }

}

export default drawing