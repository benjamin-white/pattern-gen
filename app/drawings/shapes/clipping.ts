import { range } from 'radash'
import type { DrawScriptType } from '../../hooks/useDraw'
import {
  TAU,
  background,
  pattern,
  shape,
  withClip,
  withOrigin,
} from '@arklo/toolbox'

// UNIFY PATTERN API!!
// DO ROUNDING
// NICE OUTSET FUNC??
// DASH STROKES??
// ALL PATTERNS
// ---
// DO "RUNES" and glyphs -> later!
// DROP OLD "DRAWINGS"

// 007 =
// rain
// density [noise, gradient, etc.]
// intensity
// width

// could be noise

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  background(ctx, 'rgba(0, 0, 0, .05)')

  // ctx.fillStyle = 'pink'
  // pattern.orbital(ctx, [800, 800])
  withOrigin(
    {
      ctx,
      location: [sizeX * 0.5, sizeY * 0.5],
      // rotation: Math.PI * Math.random(),
      rotation: 0,
    },
    () => {
      // create outet
      // ctx.beginPath()
      // shape.square({ ctx, size: ctx.canvas.width * 0.1 * 2 + 10 })
      // ctx.closePath()
      // ctx.fill()
      // ctx.lineWidth = 0.5
      // ctx.stroke()
      // ctx.lineWidth = 1
      // end ouset
      ctx.beginPath()
      withClip(
        {
          ctx,
          radius: ctx.canvas.width * 0.2, // hmmm, longest x | y ??
        },
        (ctx, radius) => {
          shape.square({ ctx, size: radius * 2 })
          ctx.stroke()
        },
        (ctx, radius) => {
          ctx.fill()
          // pattern.chequer({
          //   ctx,
          //   bbox: {
          //     x: { min: radius * -1, max: radius },
          //     y: { min: radius * -1, max: radius },
          //   },
          //   config: {
          //     cellSize: 20,
          //     colorTwo: '#96cbc0',
          //   },
          // })
          pattern.orbital({
            ctx,
            bbox: {
              x: { min: radius * -1, max: radius },
              y: { min: radius * -1, max: radius },
            },

            config: {
              scaleBy: 'random',
            },
          })
          // pattern.waves({
          //   ctx,
          //   bbox: {
          //     x: { min: radius * -1, max: radius },
          //     y: { min: radius * -1, max: radius },
          //   },
          //   config: {
          //     cellSize: 30,
          //   },
          // })

          // shape.circle({ ctx, radius: sizeX * 0.03 })
          // ctx.stroke()
          // ctx.fill()
          // ctx.beginPath()
          // ctx.moveTo(-radius, -radius)
          // ctx.lineTo(radius * 0.5, radius)
          // ctx.lineWidth = 4
          // ctx.strokeStyle = 'orange'
          // ctx.closePath()
          // ctx.stroke()
        },
      )
    },
  )

  // withOrigin(
  //   {
  //     ctx,
  //     location: [sizeX * 0.4, sizeY * 0.2],
  //     rotation: Math.PI * 0.4,
  //   },
  //   () => {
  //     withClip(
  //       {
  //         ctx,
  //         radius: ctx.canvas.width * 0.12,
  //       },
  //       (ctx, radius) => {
  //         shape.polygon({
  //           ctx,
  //           points: [...range(0.5, 5.5)].map((i) => [
  //             radius * Math.random() * Math.cos((TAU / 6) * i),
  //             radius * Math.random() * Math.sin((TAU / 6) * i),
  //           ]),
  //         })
  //         ctx.stroke()
  //       },
  //       (ctx, radius) => {
  //         ctx.fill()
  //         pattern.chequer({
  //           ctx,
  //           bbox: {
  //             x: { min: radius * -1, max: radius },
  //             y: { min: radius * -1, max: radius },
  //           },
  //           config: {
  //             cellSize: 20,
  //             colorTwo: '#96cbc0',
  //           },
  //         })
  //         // pattern.chequer(
  //         //   ctx,
  //         //   {
  //         //     x: { min: radius * -1, max: radius },
  //         //     y: { min: radius * -1, max: radius },
  //         //   },
  //         //   10,
  //         //   '#000',
  //         //   'orange',
  //         // )
  //         ctx.strokeStyle = '#fff'
  //         ctx.lineWidth = 12
  //         // pattern.waves(ctx, {
  //         //   x: { min: radius * -1, max: radius },
  //         //   y: { min: radius * -1, max: radius },
  //         // })
  //       },
  //     )
  // },
  // )
}

export default drawing
