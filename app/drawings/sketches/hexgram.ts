import { DrawScriptType } from '@/hooks/useDraw'
import { japaneseElegance } from '@/config/palletes'
import { TAU, fit, gridElements } from '@arklo/toolbox'

const DEFAULT_SYMBOL_RADIUS = 40
const angle = TAU / 3

const drawCellSymbol = (
  {
    ctx,
    cellSizeX,
    cellSizeY,
    posX: cellX,
    posY: cellY,
  }: {
    ctx: CanvasRenderingContext2D
    cellSizeX: number
    cellSizeY: number
    posX: number
    posY: number
  },
  radius: number,
) => {
  ctx.beginPath()
  const localOrigin = {
    x: cellX + cellSizeX * 0.5,
    y: cellY + cellSizeY * 0.5,
  }

  ctx.strokeStyle = japaneseElegance.casper

  const axisPoints: [number, number][] = []
  for (const i of [0, 1, 2]) {
    axisPoints.push([
      localOrigin.x +
        radius *
          fit(Math.random(), 0, 1, 0.1, 1.1) *
          Math.cos(angle * i + TAU * 0.25),
      localOrigin.y +
        radius *
          fit(Math.random(), 0, 1, 0.1, 1.1) *
          Math.sin(angle * i + TAU * 0.25),
    ])
  }

  for (const index in axisPoints) {
    const [x, y] = axisPoints[index]
    ctx.fillStyle = 'rgba(200, 208, 218, .4)'
    ctx.moveTo(localOrigin.x, localOrigin.y)
    ctx.lineTo(x, y)
    ctx.lineTo(axisPoints[(+index + 1) % 3][0], axisPoints[(+index + 1) % 3][1])
    ctx.lineTo(localOrigin.x, localOrigin.y)
    ctx.fill()

    ctx.moveTo(localOrigin.x, localOrigin.y)
    ctx.lineTo(x, y)
    ctx.lineTo(axisPoints[(+index + 1) % 3][0], axisPoints[(+index + 1) % 3][1])

    ctx.stroke()
    ctx.closePath()
  }
}

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  const cellCount = 5
  const guttersSize = 40
  const canvasPadding = 80
  ctx.fillStyle = japaneseElegance.whiteLinen
  ctx.fillRect(0, 0, sizeX, sizeY)

  gridElements(
    {
      ctx,
      canvasDimensions: { x: sizeX, y: sizeY },
      cellCounts: { x: cellCount, y: cellCount },
      gutters: { x: guttersSize, y: guttersSize },
      offsets: { x: canvasPadding, y: canvasPadding },
      drawCallback: drawCellSymbol,
      debug: false,
    },
    DEFAULT_SYMBOL_RADIUS,
  )
}

export default drawing
