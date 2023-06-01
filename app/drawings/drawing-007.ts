import type { DrawScriptType } from "../hooks/useDraw";
import { Noise, Grad, fit } from "@arklo/toolbox";
// import {  } from "../helpers";

const getNoiseValue = new Noise(Grad);

const enum NoisePattern {
  PERLIN2 = "perlin2",
  PERLIN3 = "perlin3",
  SIMPLEX2 = "simplex2",
  SIMPLEX3 = "simplex3",
}

const enum SymbolType {
  DASH = "DASH",
  SQUARE = "SQUARE",
  CIRCLE = "CIRCLE",
}

type SymbolProps = {
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  cellPos: [number, number];
  type: SymbolType;
  noisePattern: NoisePattern;
};

const symbol = ({
  ctx,
  cellSize,
  cellPos: [cellX, cellY],
  type,
  noisePattern,
}: SymbolProps) => {
  let noise = getNoiseValue[noisePattern](
    cellX / cellSize / 10,
    cellY / cellSize / 10,
    Math.random() * 0.2
  );

  const symbols = {
    [SymbolType.DASH]: () => {
      ctx.fillRect(cellX, cellY, cellSize * (noise + 0.5), cellSize);
    },
    [SymbolType.SQUARE]: () => {
      noise += 0.5;
      const cellCenterOffset = (cellSize - cellSize * noise) * 0.5;
      ctx.fillRect(
        cellX + cellCenterOffset,
        cellY + cellCenterOffset,
        cellSize * noise,
        cellSize * noise
      );
    },
    [SymbolType.CIRCLE]: () => {
      ctx.arc(
        cellX + cellSize * 0.5,
        cellY + cellSize * 0.5,
        cellSize * fit(noise, -1, 1, 0.02, 0.6),
        0,
        Math.PI * 2
      );
      ctx.fill();
    },
  };

  ctx.beginPath();
  ctx.fillStyle = "#000";
  symbols[type] && symbols[type]();
};

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const cellSize = 50;
  const cellsX = sizeX / cellSize;
  const cellsY = sizeY / cellSize;

  for (let i = 0; i < cellsX; i++) {
    for (let j = 0; j < cellsY; j++) {
      symbol({
        ctx,
        cellSize,
        cellPos: [i * cellSize, j * cellSize],
        type: SymbolType.SQUARE,
        noisePattern: NoisePattern.PERLIN3,
      });
    }
  }
};

export default drawing;
