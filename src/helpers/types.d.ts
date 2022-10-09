declare module 'poisson-disk-sampling'

type Vec2d = {
  x: number;
  y: number;
}

type Pallete = Record<string, string>

interface CellSymbol {
  (
    arg0: {
      ctx: CanvasRenderingContext2D,
      cells: [number, number],
      cellSize: number,
    }
  ): void
}