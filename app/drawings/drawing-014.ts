import type { DrawScriptType } from "../hooks/useDraw";
import { Noise, Grad, loopCells } from "@arklo/toolbox";

const getNoiseValue = new Noise(Grad);

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 20;
  const cellsX = sizeX / cellSize;
  const cellsY = sizeY / cellSize;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  loopCells(ctx, cellsX, cellsY, cellSize, symbol);
};

const symbol: CellSymbol = ({ ctx, cells: [x, y], cellSize }) => {
  const noise = getNoiseValue.perlin2(x * 0.46, y * 0.006);
  // const noise = getNoiseValue.simplex2(x * .004, y * .009);
  // if (Math.random() > .9) return;
  // if (getNoiseValue.perlin2(x * 0.009, y * 0.009) > 0 || Math.random() > 0.8)
  //   return;
  // const direction = Math.random() > .5 ? 1 : 0
  const probability = 0.2;

  ctx.beginPath();
  ctx.moveTo(x + (noise > probability ? cellSize : 0), y);
  ctx.lineTo(x + (noise > -probability ? 0 : cellSize), y + cellSize);
  ctx.stroke();
};

export default drawing;
