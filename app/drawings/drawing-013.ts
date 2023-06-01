import type { DrawScriptType } from "../hooks/useDraw";
import { loopCells } from "@arklo/toolbox";

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 50;
  const cellsX = sizeX / cellSize;
  const cellsY = sizeY / cellSize;

  ctx.lineWidth = 6;
  ctx.lineCap = "round";

  loopCells(ctx, cellsX, cellsY, cellSize, symbol);
};

const symbol: CellSymbol = ({ ctx, cells: [x, y], cellSize }) => {
  const direction = Math.random() > 0.2 ? 1 : 0;

  ctx.beginPath();
  ctx.moveTo(x + (direction ? cellSize : 0), y);
  ctx.lineTo(x + (direction ? 0 : cellSize), y + cellSize);
  ctx.stroke();
};

export default drawing;
