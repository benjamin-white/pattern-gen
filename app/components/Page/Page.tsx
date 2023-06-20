import Canvas from '@/components/Canvas'
import useLoadDrawScript from '@/hooks/useLoadDrawScript'

const Page = () => {
  const drawScript = useLoadDrawScript()

  return drawScript ? <Canvas drawing={drawScript} /> : <>LOADING...</>
}

export default Page
