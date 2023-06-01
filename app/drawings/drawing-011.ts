import { range } from "radash";
import { fit } from "@arklo/toolbox";
import type { DrawScriptType } from "../hooks/useDraw";

const TAU = Math.PI * 2;
const angle = TAU / 6;

const pallete1 = ["#cbffe3", "#000", "#fff"];

const drawing: DrawScriptType = async (ctx, [sizeX, sizeY]) => {
  ctx.lineCap = "round";

  const gridSize = 50;
  let gridPos = { x: -gridSize, y: gridSize };

  ctx.fillStyle = "rgb(234, 234, 234)";
  ctx.fillRect(0, 0, sizeX, sizeY);

  while (gridPos.y < sizeY + gridSize) {
    while (gridPos.x < sizeX + gridSize) {
      const scale = gridSize * fit(+Math.random().toFixed(1), 0, 1, 0.9, 1);
      ctx.lineWidth = scale * 0.06;
      ctx.strokeStyle = pallete1[Math.floor(Math.random() * pallete1.length)];
      hexagon(ctx, [gridPos.x, gridPos.y], gridSize);
      gridPos.x += gridSize * 1.73; // this is eyeballed, need to get correct ratio (right angle triangle from center to edge)
    }
    gridPos.x = -gridSize;
    gridPos.y += gridSize * 2;
  }
};

const hexagon = (
  ctx: CanvasRenderingContext2D,
  [cellX, cellY]: [number, number],
  radius: number
) => {
  ctx.beginPath();

  // draw perimeter
  for (const i of range(0.5, 5.5)) {
    ctx.lineTo(
      cellX + radius * Math.cos(angle * i),
      cellY + radius * Math.sin(angle * i)
    );
  }

  // draw inner sides
  for (const i of range(1.5, 6.5, 2)) {
    ctx.moveTo(cellX, cellY);
    ctx.lineTo(
      cellX + radius * Math.cos(angle * i),
      cellY + radius * Math.sin(angle * i)
    );
  }

  hexagonHatch(ctx, [cellX, cellY], radius, angle);

  ctx.stroke();
};

const hexagonHatch = (
  ctx: CanvasRenderingContext2D,
  [cellX, cellY]: [number, number],
  radius: number,
  angle: number
) => {
  type Frequency = 2 | 3 | 4 | 5 | 6;

  const frequency: Frequency[] = [2, 3, 4, 5, 6];

  const panelTop = (frequency: Frequency) => {
    const dist = radius / frequency;
    const direction = Math.round(Math.random());
    const start = direction ? 3.5 : 5.5;
    const end = direction ? 5.5 : 3.5;
    for (const i of range(1, frequency)) {
      const px = cellX + dist * i * Math.cos(angle * start);
      const py = cellY + dist * i * Math.sin(angle * start);
      ctx.moveTo(px, py);
      ctx.lineTo(
        px + radius * Math.cos(angle * end),
        py + radius * Math.sin(angle * end)
      );
    }
    if (frequency > 2 || Math.random() < 0.3) return;
    for (const i of range(1, frequency)) {
      const px = cellX + dist * i * Math.cos(angle * end);
      const py = cellY + dist * i * Math.sin(angle * end);
      ctx.moveTo(px, py);
      ctx.lineTo(
        px + radius * Math.cos(angle * start),
        py + radius * Math.sin(angle * start)
      );
    }
    // vertical and horizontal!!
  };

  const panelRight = (frequency: Frequency) => {
    const dist = radius / frequency;
    const direction = Math.round(Math.random());
    const start = direction ? 1.5 : 5.5;
    const end = direction ? 5.5 : 1.5;
    for (const i of range(1, frequency)) {
      const px = cellX + dist * i * Math.cos(angle * start);
      const py = cellY + dist * i * Math.sin(angle * start);
      ctx.moveTo(px, py);
      ctx.lineTo(
        px + radius * Math.cos(angle * end),
        py + radius * Math.sin(angle * end)
      );
    }
    if (frequency > 2 || Math.random() < 0.3) return;
    for (const i of range(1, frequency)) {
      const px = cellX + dist * i * Math.cos(angle * end);
      const py = cellY + dist * i * Math.sin(angle * end);
      ctx.moveTo(px, py);
      ctx.lineTo(
        px + radius * Math.cos(angle * start),
        py + radius * Math.sin(angle * start)
      );
    }
    // diagonal?
  };

  const panelLeft = (frequency: Frequency) => {
    const dist = radius / frequency;
    const direction = Math.round(Math.random());
    const start = direction ? 3.5 : 1.5;
    const end = direction ? 1.5 : 3.5;
    for (const i of range(1, frequency)) {
      const px = cellX + dist * i * Math.cos(angle * start);
      const py = cellY + dist * i * Math.sin(angle * start);
      ctx.moveTo(px, py);
      ctx.lineTo(
        px + radius * Math.cos(angle * end),
        py + radius * Math.sin(angle * end)
      );
    }
    if (frequency > 2 || Math.random() < 0.3) return;
    for (const i of range(1, frequency)) {
      const px = cellX + dist * i * Math.cos(angle * end);
      const py = cellY + dist * i * Math.sin(angle * end);
      ctx.moveTo(px, py);
      ctx.lineTo(
        px + radius * Math.cos(angle * start),
        py + radius * Math.sin(angle * start)
      );
    }
    // diagonal?
  };

  // fix 'bottom panel'
  // detrministically drop structural lines - hatch first and capture? - allow 'out of bounds'?
  // add panel variants
  // add wildcards, eg. romboid fill

  if (Math.random() > 0.2) {
    panelTop(frequency[~~(Math.random() * frequency.length)]);
  }
  if (Math.random() > 0.2) {
    panelRight(frequency[~~(Math.random() * frequency.length)]);
  }
  if (Math.random() > 0.2) {
    panelLeft(frequency[~~(Math.random() * frequency.length)]);
  }

  // frequency
  // top | left | right
  // vertical | horizontal | diagonal
  // run inset
  // vars = hatchCount, hatchDirection (vertical, horizontal, diagonal (complex))

  // const hatchDist = radius / 6
  // const nx = cellX + hatchDist * Math.cos(angle * 1.5)
  // const ny = cellY + hatchDist * Math.sin(angle * 1.5)
  // ctx.moveTo(nx, ny)
  // ctx.lineTo(nx + radius * Math.cos(angle * 5.5), ny + radius * Math.sin(angle * 5.5))

  // const tx = cellX + hatchDist * 2 * Math.cos(angle * 1.5)
  // const ty = cellY + hatchDist * 2 * Math.sin(angle * 1.5)
  // ctx.moveTo(tx, ty)
  // ctx.lineTo(tx + radius * Math.cos(angle * 5.5), ty + radius * Math.sin(angle * 5.5))

  // const hatchDist2 = radius / 4

  // const hx = cellX + hatchDist2 * 2 * Math.cos(angle * 3.5)
  // const hy = cellY + hatchDist2 * 2 * Math.sin(angle * 3.5)
  // ctx.moveTo(hx, hy)
  // ctx.lineTo(hx + radius * Math.cos(angle * 1.5), hy + radius * Math.sin(angle * 1.5))

  // const rx = cellX + hatchDist2 * 3 * Math.cos(angle * 3.5)
  // const ry = cellY + hatchDist2 * 3 * Math.sin(angle * 3.5)
  // ctx.moveTo(rx, ry)
  // ctx.lineTo(rx + radius * Math.cos(angle * 1.5), ry + radius * Math.sin(angle * 1.5))
};

export default drawing;
