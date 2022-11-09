import type { DrawScriptType } from '../hooks/useDraw'

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {

  const TAU = Math.PI * 2
  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize
  let alternate = 0
  const debug = false

  for (let i = 0; i < cellsX; i++) {

    alternate++

    for (let j = 0; j < cellsY; j++) {

      if (alternate % 2 !== 0) {

        if (debug) {
          ctx.fillStyle = 'pink'
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }

        alternate++
        continue

      }

      const margin = Math.floor(Math.random() * 10) + 20
      const radius = (cellSize - margin) * .5
      const cellCenter = {
        x: i * cellSize + cellSize * .5,
        y: j * cellSize + cellSize * .5
      }

      ctx.beginPath()
      ctx.fillStyle = '#000'
      ctx.arc(cellCenter.x, cellCenter.y, radius, 0, TAU)
      ctx.fill()
  
      if (debug) {
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.arc(cellCenter.x, cellCenter.y, 2, 0, TAU)
        ctx.fill()
      }

      alternate++

    }

  }

}

export default drawing