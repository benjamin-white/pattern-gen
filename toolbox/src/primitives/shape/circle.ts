import { TAU } from '../../constants'

type Circle = {
  ctx: CanvasRenderingContext2D
  radius: number
}

const circle = ({ ctx, radius }: Circle) => {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, TAU)
}

export default circle
