import { DrawScriptType } from '@/hooks/useDraw'
import { japaneseElegance } from '@/config/palletes'
import { Box3D, fit, getRandom, gridElements } from '@arklo/toolbox'
import { range } from 'radash'

const FIXED_RANDOM = false
const DEFAULT_SYMBOL_RADIUS = 140
const random = getRandom(FIXED_RANDOM)

const drawCellSymbol = (
  {
    ctx,
    cellSizeX,
    posX: x,
    posY: y,
  }: {
    ctx: CanvasRenderingContext2D
    cellSizeX: number
    posX: number
    posY: number
  },
  radius: number,
) => {
  const USE_COLOR_FILL = random() > 0.7
  const boxOrigin = { x: x + cellSizeX * 0.5, y: y + cellSizeX * 0.5 }
  const boxOne = new Box3D(
    boxOrigin,
    radius * 0.25 + fit(random(), 0, 1, -6, 6),
  )
  const boxTwo = new Box3D(
    boxOrigin,
    radius * 0.25 + fit(random(), 0, 1, -6, 6),
  )

  boxOne.setRotation({ x: random(), y: random(), z: random() })
  boxTwo.setRotation({ x: random(), y: random(), z: random() })

  const edgesOne = boxOne.getEdges()
  const edgesTwo = boxTwo.getEdges()

  ctx.save()
  ctx.rect(
    boxOrigin.x - 0,
    boxOrigin.y - cellSizeX * 0.5,
    cellSizeX * 0.5,
    cellSizeX,
  )
  ctx.clip()
  ctx.beginPath()
  const boundaryVerts = boxOne.getPerimiterVerts()
  const colors = Object.values(japaneseElegance)
  for (const index in boundaryVerts) {
    if (USE_COLOR_FILL) {
      ctx.fillStyle = colors[~~(colors.length * random())]
    }
    ctx[!index ? 'moveTo' : 'lineTo'](
      boundaryVerts[index].x,
      boundaryVerts[index].y,
    )
  }
  ctx.fill()

  for (const edge of edgesOne) {
    ctx.beginPath()
    ctx.moveTo(edge.start.x, edge.start.y)
    ctx.lineTo(edge.end.x, edge.end.y)
    ctx.stroke()
  }
  ctx.restore()

  ctx.save()
  ctx.rect(
    boxOrigin.x - cellSizeX * 0.5,
    boxOrigin.y - cellSizeX * 0.5,
    cellSizeX * 0.5,
    cellSizeX,
  )
  ctx.clip()

  ctx.beginPath()
  const boundaryVerts2 = boxTwo.getPerimiterVerts()
  for (const index in boundaryVerts2) {
    if (USE_COLOR_FILL) {
      ctx.fillStyle = colors[~~(colors.length * random())]
    }
    ctx[!index ? 'moveTo' : 'lineTo'](
      boundaryVerts2[index].x,
      boundaryVerts2[index].y,
    )
  }
  ctx.fill()

  for (const edge of edgesTwo) {
    ctx.beginPath()
    ctx.moveTo(edge.start.x, edge.start.y)
    ctx.lineTo(edge.end.x, edge.end.y)
    ctx.stroke()
  }
  ctx.restore()

  ctx.save()
  ctx.lineWidth = 4
  ctx.rect(
    boxOrigin.x - cellSizeX * 0.2,
    boxOrigin.y - cellSizeX * 0.2,
    cellSizeX * 0.4,
    cellSizeX * 0.4,
  )
  ctx.clip()

  ctx.beginPath()
  for (const index in boundaryVerts) {
    if (USE_COLOR_FILL) {
      ctx.fillStyle = colors[~~(colors.length * random())]
    }
    ctx[!index ? 'moveTo' : 'lineTo'](
      boundaryVerts[index].x,
      boundaryVerts[index].y,
    )
  }
  ctx.fill()
  for (const edge of edgesOne) {
    ctx.beginPath()
    ctx.moveTo(edge.start.x, edge.start.y)
    ctx.lineTo(edge.end.x, edge.end.y)
    ctx.stroke()
  }

  ctx.beginPath()
  for (const index in boundaryVerts2) {
    if (USE_COLOR_FILL) {
      ctx.fillStyle = colors[~~(colors.length * random())]
    }
    ctx[!index ? 'moveTo' : 'lineTo'](
      boundaryVerts2[index].x,
      boundaryVerts2[index].y,
    )
  }
  ctx.fill()
  for (const edge of edgesTwo) {
    ctx.beginPath()
    ctx.moveTo(edge.start.x, edge.start.y)
    ctx.lineTo(edge.end.x, edge.end.y)
    ctx.stroke()
  }
  ctx.restore()
}

const colorScheme = {
  blueprint: {
    stroke: japaneseElegance.casper,
    fill: '#fcf9f6',
  },
  granite: {
    stroke: '#919595',
    fill: '#fcf9f6',
  },
  paper: {
    stroke: '#727777',
    fill: 'rgb(243 240 236)',
  },
  blackAndWhite: {
    stroke: '#727777',
    fill: '#fff',
  },
  tokyo: {
    stroke: '#f07810',
    fill: '#3a3f4b',
  },
}

const colorSchemeNames = Object.keys(colorScheme)

const currentColorScheme =
  colorSchemeNames[~~(colorSchemeNames.length * random())]

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellCount = 4
  const guttersSize = 0
  const canvasPadding = 100
  const colWidth = (sizeX - canvasPadding * 2) / cellCount

  ctx.lineCap = 'round'
  ctx.lineWidth = 1
  ctx.fillStyle = colorScheme[currentColorScheme].fill
  ctx.strokeStyle = colorScheme[currentColorScheme].stroke
  ctx.fillRect(0, 0, sizeX, sizeY)

  random() > 0.5 && ctx.setLineDash([3, 3])

  for (const row of range(1, 4)) {
    ctx.moveTo(canvasPadding, colWidth * row - colWidth * 0.5 + canvasPadding)
    ctx.lineTo(
      sizeX - canvasPadding,
      colWidth * row - colWidth * 0.5 + canvasPadding,
    )
    ctx.stroke()
  }
  ctx.setLineDash([])

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

  random() > 0.5 && ctx.setLineDash([20, 20])

  ctx.beginPath()
  for (const col of range(1, 4)) {
    ctx.moveTo(colWidth * col - colWidth * 0.5 + canvasPadding, canvasPadding)
    ctx.lineTo(
      colWidth * col - colWidth * 0.5 + canvasPadding,
      sizeY - canvasPadding,
    )
    ctx.stroke()
  }
}

export default drawing
