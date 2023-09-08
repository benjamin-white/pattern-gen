import { DrawScriptType } from '@/hooks/useDraw'
import { japaneseElegance } from '@/config/palletes'
import { range } from 'radash'

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  ctx.fillStyle = japaneseElegance.whiteLinen
  ctx.fillRect(0, 0, sizeX, sizeY)

  const cellSize = 20
  const padding = 40
  const cellsX = (sizeX - padding * 2) / cellSize - 1
  const cellsY = (sizeY - padding * 2) / cellSize - 1

  for (let i of range(0, cellsX)) {
    for (let j of range(0, cellsY)) {
      if (Math.random() > 0.2) {
        i += 1
        // sample from noise?
        let x = i * cellSize + padding + cellSize * 0.5
        const y = j * cellSize + padding + cellSize * 0.5

        ctx.fillStyle = japaneseElegance.careysPink
        if (x > sizeX - padding) {
          x -= sizeX + padding
          ctx.fillStyle = japaneseElegance.melanie
        }
        if (x < padding) continue
        ctx.beginPath()
        ctx.arc(x, y, cellSize * 0.14, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
}

export default drawing
