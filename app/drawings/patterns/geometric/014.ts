import type { DrawScriptType } from '@/hooks/useDraw'
import { range } from 'radash'

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  for (const i of range(-1, cellsX)) {
    for (const j of range(-1, cellsY)) {
      if (Math.random() > 0.2) {
        bracket(
          ctx,
          i * cellSize,
          j * cellSize,
          cellSize,
          +Math.random().toFixed(1),
        )
        // bracket(
        //   ctx,
        //   i * cellSize,
        //   j * cellSize,
        //   cellSize,
        //   +Math.random().toFixed(1),
        // )
      } else {
        dots(ctx, i * cellSize, j * cellSize, cellSize)
      }
    }
  }
}

const bracket = (ctx, x, y, cellSize, inset = 0.5) => {
  const variants = {
    one: (ctx) => {
      ctx.moveTo(x + cellSize, y)
      ctx.lineTo(x, y + cellSize)
      ctx.lineTo(x + cellSize * inset, y + cellSize)
      ctx.lineTo(x + cellSize, y + cellSize * inset)
    },
    two: (ctx) => {
      ctx.moveTo(x + cellSize * inset, y)
      ctx.lineTo(x, y + cellSize * inset)
      ctx.lineTo(x, y + cellSize)
      ctx.lineTo(x + cellSize, y)
    },
    three: (ctx) => {
      ctx.moveTo(x, y)
      ctx.lineTo(x + cellSize * inset, y)
      ctx.lineTo(x + cellSize, y + cellSize - cellSize * inset)
      ctx.lineTo(x + cellSize, y + cellSize)
    },
    four: (ctx) => {
      ctx.moveTo(x, y)
      ctx.lineTo(x + cellSize, y + cellSize)
      ctx.lineTo(x + cellSize * inset, y + cellSize)
      ctx.lineTo(x, y + cellSize - cellSize * inset)
    },
  }

  ctx.beginPath()
  const variantKeys = Object.keys(variants)
  variants[variantKeys[Math.floor(Math.random() * variantKeys.length)]](ctx)
  ctx.closePath()
  ctx.fill()
}

const withStrokeOrFill = (ctx, render, strokeOrFill) => {
  ctx.beginPath()
  render()
  ctx.closePath()
  ctx[strokeOrFill]()
}

const dots = (ctx, x, y, cellSize) => {
  const variants = {
    one: (ctx) => {
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.3,
            y + cellSize * 0.5,
            cellSize * 0.1 - 10 * Math.random(),
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.65 ? 'stroke' : 'fill',
      )
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.7,
            y + cellSize * 0.5,
            cellSize * 0.1 - 10 * Math.random(),
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.5 ? 'stroke' : 'fill',
      )
    },
    two: (ctx) => {
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.5,
            y + cellSize * 0.5,
            cellSize * 0.3 - 10 * Math.random(),
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.65 ? 'stroke' : 'fill',
      )
    },
    three: (ctx) => {
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.3,
            y + cellSize * 0.3,
            cellSize * 0.1,
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.65 ? 'stroke' : 'fill',
      )
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.7,
            y + cellSize * 0.7,
            cellSize * 0.1,
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.65 ? 'stroke' : 'fill',
      )
    },
  }
  const variantKeys = Object.keys(variants)

  ctx.lineWidth = 3
  variants[variantKeys[Math.floor(Math.random() * variantKeys.length)]](ctx)
  // Math.random() > 0.3 ? ctx.fill() : ctx.stroke()
}

const hatch = () => {
  // implement
}

export default drawing
