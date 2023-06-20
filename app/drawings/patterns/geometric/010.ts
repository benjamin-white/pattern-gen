import { range } from 'radash'
import type { DrawScriptType } from '@/hooks/useDraw'

const TAU = Math.PI * 2

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  const gridSize = 80
  let gridPos = { x: -gridSize, y: gridSize }

  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.fillStyle = 'red'

  while (gridPos.y < sizeY + gridSize) {
    while (gridPos.x < sizeX + gridSize) {
      hexagon(ctx, [gridPos.x, gridPos.y], gridSize)
      gridPos.x += gridSize * 1.73 // this is eyeballed, need to get correct ratio (right angle triangle from center to edge)
    }
    gridPos.x = -gridSize
    gridPos.y += gridSize * 2
  }
}

// see also: https://codepen.io/Guimauve01/pen/vWPQya“
const hexagon = (
  ctx: CanvasRenderingContext2D,
  [cellX, cellY]: [number, number],
  radius: number,
) => {
  const angle = TAU / 6

  ctx.beginPath()

  // draw perimeter
  for (const i of range(0.5, 4.5)) {
    ctx.lineTo(
      cellX + radius * Math.cos(angle * i),
      cellY + radius * Math.sin(angle * i),
    )
  }

  // draw inner sides
  for (const i of range(1.5, 6.5, 2)) {
    ctx.moveTo(cellX, cellY)
    ctx.lineTo(
      cellX + radius * Math.cos(angle * i),
      cellY + radius * Math.sin(angle * i),
    )
  }

  ctx.stroke()
}

export default drawing
