import type { DrawScriptType } from '@/hooks/useDraw'
import { Noise, Grad, fit } from '@arklo/toolbox'
import { japaneseElegance } from '@/config/palletes'

const getNoiseValue = new Noise(Grad)

const enum NoisePattern {
  PERLIN2 = 'perlin2',
  PERLIN3 = 'perlin3',
  SIMPLEX2 = 'simplex2',
  SIMPLEX3 = 'simplex3',
}

const enum SymbolType {
  DASH = 'DASH',
  SQUARE = 'SQUARE',
  CIRCLE = 'CIRCLE',
}

type SymbolProps = {
  ctx: CanvasRenderingContext2D
  cellSize: number
  cellPos: [number, number]
  type: SymbolType
  noisePattern: NoisePattern
}

const symbol = ({
  ctx,
  cellSize,
  cellPos: [cellX, cellY],
  type,
  noisePattern,
}: SymbolProps) => {
  let noise = getNoiseValue[noisePattern](
    cellX / cellSize / 10,
    cellY / cellSize / 10,
    Math.random() * 0.2,
  )

  const symbols = {
    [SymbolType.DASH]: () => {
      ctx.strokeStyle = japaneseElegance.melanie
      ctx.fillStyle = japaneseElegance.whiteLinen
      ctx.rect(cellX, cellY, cellSize * (noise + 0.5), cellSize)
      ctx.fill()
      ctx.stroke()
    },
    [SymbolType.SQUARE]: () => {
      noise += 0.5
      const cellCenterOffset = (cellSize - cellSize * noise) * 0.5
      ctx.strokeStyle = japaneseElegance.melanie
      ctx.rect(
        cellX + cellCenterOffset,
        cellY + cellCenterOffset,
        cellSize * noise,
        cellSize * noise,
      )
      ctx.stroke()
    },
    [SymbolType.CIRCLE]: () => {
      ctx.arc(
        cellX + cellSize * 0.5,
        cellY + cellSize * 0.5,
        cellSize * fit(noise, -1, 1, 0.02, 0.6),
        0,
        Math.PI * 2,
      )
      ctx.fill()
      ctx.stroke()
    },
  }

  ctx.beginPath()
  symbols[type] && symbols[type]()
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 20
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  ctx.fillStyle = japaneseElegance.casper
  ctx.fillRect(0, 0, sizeX, sizeY)
  ctx.fillStyle = japaneseElegance.melanie

  for (let i = 0; i < cellsX; i++) {
    for (let j = 0; j < cellsY; j++) {
      ctx.strokeStyle = japaneseElegance.careysPink
      symbol({
        ctx,
        cellSize,
        cellPos: [i * cellSize, j * cellSize],
        type: SymbolType.CIRCLE,
        noisePattern: NoisePattern.PERLIN3,
      })
    }
  }
}

export default drawing
