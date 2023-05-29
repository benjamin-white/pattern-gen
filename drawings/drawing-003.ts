import normal from "../helpers/utils/gaussian";
import type { DrawScriptType } from "../hooks/useDraw";

const symbol = (
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  [cellX, cellY]: [number, number]
) => {
  ctx.beginPath();
  ctx.fillRect(cellX, cellY + cellSize * 0.5, cellSize, cellSize * 0.5);
  ctx.fillRect(cellX + cellSize * 0.5, cellY, cellSize * 0.5, cellSize);
};

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 10;
  const cellsX = sizeX / cellSize;
  const cellsY = sizeY / cellSize;
  let alternate = 0;

  for (let i = 0; i < cellsX; i++) {
    alternate++;

    for (let j = 0; j < cellsY; j++) {
      if (alternate % 2 !== 0) {
        alternate++;
        continue;
      }

      symbol(ctx, cellSize * normal({}), [i * cellSize, j * cellSize]);
      alternate++;
    }
  }
};

export default drawing;
