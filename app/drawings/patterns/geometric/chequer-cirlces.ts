import type { DrawScriptType } from '../../../hooks/useDraw'

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const TAU = Math.PI * 2
  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  let alternate = 0

  for (let i = 0; i < cellsX; i++) {
    alternate++

    for (let j = 0; j < cellsY; j++) {
      if (alternate % 2 !== 0) {
        alternate++
        continue
      }

      const margin = Math.floor(Math.random() * 10) + 20
      const radius = (cellSize - margin) * 0.5
      const cellCenter = {
        x: i * cellSize + cellSize * 0.5,
        y: j * cellSize + cellSize * 0.5,
      }

      ctx.beginPath()
      ctx.arc(cellCenter.x, cellCenter.y, radius, 0, TAU)
      ctx.lineWidth = margin
      ctx.stroke()

      alternate++
    }
  }
}

export default drawing
