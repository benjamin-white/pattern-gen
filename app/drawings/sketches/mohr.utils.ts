import { Box3D, fit, getRandom } from '@arklo/toolbox'

const random = getRandom()

export const drawCellSymbolDebug = (
  { ctx, cellSizeX, posX: x, posY: y },
  radius: number,
) => {
  const boxOrigin = { x: x + cellSizeX * 0.5, y: y + cellSizeX * 0.5 }

  const box = new Box3D(boxOrigin, radius * 0.25 + fit(random(), 0, 1, -6, 6))

  box.setRotation({ x: random(), y: random(), z: random() })

  const edges = box.getEdges()
  ctx.beginPath()
  const boundaryVerts = box.getPerimiterVerts()
  const fillColor = 'yellow'

  for (const index in boundaryVerts) {
    ctx.fillStyle = fillColor
    ctx[!index ? 'moveTo' : 'lineTo'](
      boundaryVerts[index].x,
      boundaryVerts[index].y,
    )
  }
  ctx.fill()

  for (const edge of edges) {
    ctx.beginPath()
    ctx.moveTo(edge.start.x, edge.start.y)
    ctx.lineTo(edge.end.x, edge.end.y)
    ctx.stroke()
  }
}
