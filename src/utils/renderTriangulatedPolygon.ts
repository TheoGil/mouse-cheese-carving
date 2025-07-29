import type { TriangulatedPolygon } from "./triangulatePolygon";

// https://github.com/mapbox/earcut/blob/main/viz/viz.js
function drawPoly(
  rings: number[][],
  color: string,
  fill: string,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();

  ctx.strokeStyle = color;
  ctx.fillStyle = fill;

  if (typeof rings[0][0] === "number") rings = [rings];

  for (const points of rings) {
    for (let i = 0; i < points.length; i++) {
      const x = points[i][0];
      const y = points[i][1];

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    if (fill) ctx.closePath();
  }
  ctx.stroke();

  ctx.fill("evenodd");
}

export function renderTriangulatedPolygon(
  { indexes, vertices, dimensions }: TriangulatedPolygon,
  ctx: CanvasRenderingContext2D
) {
  const triangles = [];
  for (const index of indexes) {
    triangles.push([
      vertices[index * dimensions],
      vertices[index * dimensions + 1],
    ]);
  }

  for (let i = 0; i < triangles.length; i += 3) {
    const vertices = triangles.slice(i, i + 3);

    drawPoly(vertices, "#1B3C53", "#D2C1B6", ctx);
  }
}
