declare module 'poisson-disk-sampling'

interface CellSymbol {
  (arg0: {
    ctx: CanvasRenderingContext2D
    cells: [number, number]
    cellSize: number
  }): void
}
