type Square = {
  ctx: CanvasRenderingContext2D
  size: number
}

const square = ({ ctx, size }: Square) => {
  ctx.rect(size * 0.5 * -1, size * 0.5 * -1, size, size)
}

export default square
