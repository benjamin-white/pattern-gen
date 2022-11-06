import useDraw from '../../hooks/useDraw'
import drawing from '../../drawings/drawing-015'

const Canvas = ({width = 800, height = 800 }) => {

  const Canvas = useDraw(drawing, [width, height])

  return Canvas

}

export default Canvas