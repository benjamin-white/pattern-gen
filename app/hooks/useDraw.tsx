import { useEffect, useRef } from 'react'
import { upScale } from '@arklo/toolbox'

export type DrawScriptType = (
  c: CanvasRenderingContext2D,
  a: [number, number],
) => void

const useDraw = (
  drawScript: DrawScriptType,
  [sizeX, sizeY]: [number, number],
) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    upScale(canvas, ctx, [sizeX, sizeY])
    drawScript(ctx, [sizeX, sizeY])
  }, [drawScript])

  return <canvas ref={ref} style={{ backgroundColor: '#fff' }}></canvas>
}

export default useDraw
