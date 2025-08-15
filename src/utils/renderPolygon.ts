import { getRandomColor } from "./getRandomColor";
import type { Feature, GeoJsonProperties, Polygon } from "geojson";

export function renderPolygon(
  polygon: Feature<Polygon, GeoJsonProperties>,
  ctx: CanvasRenderingContext2D
) {
  ctx.save();
  ctx.fillStyle = getRandomColor();
  ctx.beginPath();

  // If a polygon contains multiple rings, first ring represents the "surface" and the next one represents "holes" in the "surface".
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#shapes_with_holes
  polygon.forEach((ring) => {
    ring.forEach((point, pointIndex) => {
      if (pointIndex === 0) {
        ctx.moveTo(point[0], point[1]);
      } else {
        ctx.lineTo(point[0], point[1]);
      }
    });
  });

  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}
