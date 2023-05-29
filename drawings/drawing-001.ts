import type { DrawScriptType } from "../hooks/useDraw";

const pallete1 = ["#cbffe3", "#000", "#fff"];

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {
  const TAU = Math.PI * 2;
  const cellSize = 100;
  const cellsX = sizeX / cellSize;
  const cellsY = sizeY / cellSize;
  let alternate = 0;
  const debug = false;

  ctx.fillRect(0, 0, sizeX, sizeY);
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = pallete1[0];
  ctx.lineCap = "round";

  for (let i = 0; i < cellsX; i++) {
    alternate++;

    for (let j = 0; j < cellsY; j++) {
      if (alternate % 2 !== 0) {
        if (debug) {
          ctx.fillStyle = "pink";
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }

        alternate++;
        continue;
      }

      const margin = Math.floor(Math.random() * 10) + 20;
      const radius = (cellSize - margin) * 0.5;
      const cellCenter = {
        x: i * cellSize + cellSize * 0.5,
        y: j * cellSize + cellSize * 0.5,
      };

      ctx.strokeStyle = "rgb(234, 234, 234)";
      ctx.beginPath();
      // ctx.fillStyle = (i + j) % 3 === 0 ? "pink" : "#000";
      ctx.lineWidth = 4;
      ctx.arc(
        cellCenter.x,
        cellCenter.y,
        radius,
        TAU * Math.random(),
        TAU * Math.random()
      );
      ctx.stroke();
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.lineWidth = 6;
      ctx.arc(
        cellCenter.x,
        cellCenter.y,
        radius + 8,
        TAU * Math.random(),
        TAU * Math.random()
      );
      ctx.stroke();

      // ctx.fillText(`x: ${i}, j: ${j}`, cellCenter.x, cellCenter.y);
      // ctx.fillText(`coordVal: ${i + j}`, cellCenter.x, cellCenter.y);

      // if (debug) {
      ctx.beginPath();
      ctx.arc(cellCenter.x, cellCenter.y, 12 + Math.random() * 10, 0, TAU);
      ctx.fill();
      // }

      alternate++;
    }
  }
};

export default drawing;
