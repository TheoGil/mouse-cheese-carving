import type { Feature, GeoJsonProperties, Polygon } from "geojson";

import * as turf from "@turf/turf";

export function translatePolygon(
  polygon: Feature<Polygon, GeoJsonProperties>,
  x: number,
  y: number
) {
  const newPolygon = polygon.geometry.coordinates.map((ring) =>
    ring.map(([oldX, oldY]) => [oldX + x, oldY + y])
  );

  return turf.polygon(newPolygon);
}
