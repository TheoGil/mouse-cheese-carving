import type { Feature, GeoJsonProperties, Polygon } from "geojson";

import * as turf from "@turf/turf";
import type { Vector } from "matter-js";

// Note: I would have used turf transformRotate but is does not work since we are not working with actual WGS84 data
// https://github.com/Turfjs/turf/issues/1920
export function rotatePolygon(
  polygon: Feature<Polygon, GeoJsonProperties>,
  angle: number,
  origin: Vector
) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  // Iterate over vertices and rotate them around origin point.
  // https://stackoverflow.com/a/2259502
  const newPolygon = polygon.geometry.coordinates.map((ring) =>
    ring.map(([x, y]) => [
      cos * (x - origin.x) - sin * (y - origin.y) + origin.x,
      sin * (x - origin.x) + cos * (y - origin.y) + origin.y,
    ])
  );

  return turf.polygon(newPolygon);
}
