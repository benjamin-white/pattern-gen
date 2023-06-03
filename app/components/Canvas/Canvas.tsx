import useDraw, { type DrawScriptType } from '@/hooks/useDraw'

type CanvasProps = {
  width?: number
  height?: number
  drawing: DrawScriptType
}

const Canvas = ({ width = 800, height = 800, drawing }: CanvasProps) => {
  const Canvas = useDraw(drawing, [width, height])

  return Canvas
}

export default Canvas
