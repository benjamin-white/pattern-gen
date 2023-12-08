export type Pattern = {
  ctx: CanvasRenderingContext2D
  bbox: Record<'x' | 'y', { min: number; max: number }>
}
