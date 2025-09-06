import type { DrawScriptType } from '@/hooks/useDraw'
import { fit } from '@arklo/toolbox'
import { range } from 'radash'

const withStrokeOrFill = (ctx, render, strokeOrFill) => {
  ctx.beginPath()
  render(ctx)
  ctx.closePath()
  ctx[strokeOrFill]()
}

const line = (ctx, cellSize: number, origin: { x: number; y: number }) => {
  // random -> sides. mid, 2x diagonal
  ctx.lineWidth = ~~fit(Math.random(), 0, 0.9, 1, 3)
  let inset
  const ops = {
    top() {
      ctx.moveTo(origin.x, origin.y + inset * 0.05)
      ctx.lineTo(origin.x + cellSize, origin.y + inset * 0.05)
    },
    diagonalRight() {
      ctx.moveTo(origin.x, origin.y)
      ctx.lineTo(origin.x + cellSize, origin.y + cellSize)
    },
    diagonalLeft() {
      ctx.moveTo(origin.x, origin.y + cellSize)
      ctx.lineTo(origin.x + cellSize, origin.y)
    },
    bottom() {
      ctx.moveTo(origin.x, origin.y + cellSize - inset * 0.05)
      ctx.lineTo(origin.x + cellSize, origin.y + cellSize - inset * 0.05)
    },
    centerVertical() {
      if (Math.random() > 0.4) {
        const dist = fit(Math.random(), 0, 1, 2, cellSize * 0.05)
        // offset left
        ctx.moveTo(origin.x + cellSize * 0.5 - dist, origin.y + inset)
        ctx.lineTo(
          origin.x + cellSize * 0.5 - dist,
          origin.y + cellSize - inset,
        )
        // offset right
        ctx.moveTo(origin.x + cellSize * 0.5 + dist, origin.y + inset)
        ctx.lineTo(
          origin.x + cellSize * 0.5 + dist,
          origin.y + cellSize - inset,
        )
        return
      }
      ctx.moveTo(origin.x + cellSize * 0.5, origin.y + inset)
      ctx.lineTo(origin.x + cellSize * 0.5, origin.y + cellSize - inset)
    },
    centerHorizontal() {
      if (Math.random() > 0.4) {
        const dist = fit(Math.random(), 0, 1, 2, cellSize * 0.05)
        // offest top
        ctx.moveTo(origin.x + inset, origin.y + cellSize * 0.5 - dist)
        ctx.lineTo(
          origin.x + cellSize - inset,
          origin.y + cellSize * 0.5 - dist,
        )
        // offset bottom
        ctx.moveTo(origin.x + inset, origin.y + cellSize * 0.5 + dist)
        ctx.lineTo(
          origin.x + cellSize - inset,
          origin.y + cellSize * 0.5 + dist,
        )
      }
      ctx.moveTo(origin.x + inset, origin.y + cellSize * 0.5)
      ctx.lineTo(origin.x + cellSize - inset, origin.y + cellSize * 0.5)
    },
    // // need to use 'weighted probability'
    // cross() {
    //   const dist = fit(Math.random(), 0, 1, cellSize * 0.2, cellSize * 0.3)
    //   ctx.moveTo(origin.x + inset, origin.y + cellSize * 0.5 - dist)
    //   ctx.lineTo(origin.x + cellSize - inset, origin.y + cellSize * 0.5 - dist)
    //   ctx.lineTo(origin.x + inset, origin.y + cellSize * 0.5 + dist)
    //   ctx.lineTo(origin.x + cellSize - inset, origin.y + cellSize * 0.5 + dist)
    // },
  }

  ctx.beginPath()
  // ctx.moveTo(origin.x, origin.y)
  // ctx.lineTo(origin.x + cellSize, origin.y + cellSize)
  const opKeys = Object.keys(ops)
  const op1 = opKeys[~~(Math.random() * opKeys.length)]
  inset = ~~(cellSize * 0.4 * Math.random())
  ops[op1]()
  const op2 = opKeys[~~(Math.random() * opKeys.length)]
  inset = ~~(cellSize * 0.4 * Math.random())
  ops[op2]()
  ctx.closePath()
  ctx.stroke()
}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  for (const i of range(-1, cellsX)) {
    for (const j of range(-1, cellsY)) {
      ctx.lineWidth = 2

      if (Math.random() > 0.2) {
        ctx.fillStyle = '#000'
        bracket(
          ctx,
          i * cellSize,
          j * cellSize,
          cellSize,
          +Math.random().toFixed(1),
        )
        ctx.fillStyle = '#fff'
        bracket(
          ctx,
          i * cellSize,
          j * cellSize,
          cellSize,
          +Math.random().toFixed(1),
        )
      } else {
        ctx.fillStyle = '#000'
        dots(ctx, i * cellSize, j * cellSize, cellSize)
      }

      if (Math.random() > 0.2) {
        line(ctx, cellSize, { x: i * cellSize, y: j * cellSize })
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
    four:
      (ctx) =>
      // withStrokeOrFill(
      //   ctx,
      (ctx) => {
        ctx.moveTo(x, y)
        ctx.lineTo(x + cellSize, y + cellSize)
        ctx.lineTo(x + cellSize * inset, y + cellSize)
        ctx.lineTo(x, y + cellSize - cellSize * inset)
      },
    // 'stroke',
    // ),
  }

  ctx.beginPath()
  const variantKeys = Object.keys(variants)
  variants[variantKeys[Math.floor(Math.random() * variantKeys.length)]](ctx)
  ctx.closePath()
  // could be hatched with clip path?
  ctx[Math.random() < 0.1 ? 'stroke' : 'fill']()
}

// this is missinf variants! ...include 'concentric'?
const dots = (ctx, x, y, cellSize) => {
  const variants = {
    horizontal() {
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * (Math.random() > 0.5 ? 0.3 : 0.7),
            y + cellSize * 0.5,
            // -10 is fragile!
            cellSize * 0.1 - 10 * Math.random(),
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.65 ? 'stroke' : 'fill',
      )
    },
    horizontalPair: (ctx) => {
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
    concentric: (ctx) => {
      const inner = cellSize * 0.2 - 10 * Math.random()
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.5,
            y + cellSize * 0.5,
            inner,
            0,
            Math.PI * 2,
          ),
        'fill',
      )
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * 0.5,
            y + cellSize * 0.5,
            inner * 1.5,
            0,
            Math.PI * 2,
          ),
        'stroke',
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
      const orientation =
        Math.random() > 0.5
          ? [
              [0.3, 0.3],
              [0.7, 0.7],
            ]
          : [
              [0.7, 0.3],
              [0.3, 0.7],
            ]
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * orientation[0][0],
            y + cellSize * orientation[0][1],
            fit(Math.random(), 0, 1, cellSize * 0.1, cellSize * 0.2),
            0,
            Math.PI * 2,
          ),
        Math.random() > 0.65 ? 'stroke' : 'fill',
      )
      withStrokeOrFill(
        ctx,
        () =>
          ctx.arc(
            x + cellSize * orientation[1][0],
            y + cellSize * orientation[1][1],
            fit(Math.random(), 0, 1, cellSize * 0.08, cellSize * 0.15),
            0,
            Math.PI,
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
