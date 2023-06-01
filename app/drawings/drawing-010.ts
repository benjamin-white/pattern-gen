import type { DrawScriptType } from "../hooks/useDraw";
import { Noise, Grad, fit } from "@arklo/toolbox";

const getNoiseValue = new Noise(Grad);

const symbol = (
  ctx: CanvasRenderingContext2D,
  [x, y]: [number, number],
  cellSize: number,
  noise: number
) => {
  const offset = true ? +(Math.random() * 20).toFixed() : noise;

  ctx.beginPath();
  ctx.moveTo(x + offset, y + offset);
  ctx.lineTo(x + cellSize - offset, y + cellSize - offset);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + cellSize - offset, y + offset);
  ctx.lineTo(x + offset, y + cellSize - offset);
  ctx.stroke();
};

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  const cellSize = 20;
  const cellsX = sizeX / cellSize;
  const cellsY = sizeY / cellSize;
  let alternate = 0;

  ctx.lineCap = "round";

  for (let i = -1; i < cellsX; i++) {
    for (let j = -1; j < cellsY; j++) {
      alternate++;
      if (alternate % 2 !== 0) {
        continue;
      }

      const cellX = cellSize * j;
      const cellY = cellSize * i;

      let noise = fit(
        getNoiseValue.perlin2(cellX / cellSize / 20, cellY / cellSize / 20),
        -1,
        1,
        0,
        1
      );

      noise = Math.pow(noise, 4) * 12 + 2;
      ctx.lineWidth = noise;

      symbol(ctx, [cellSize * j, cellSize * i], cellSize, noise);
    }
  }
};

export default drawing;
