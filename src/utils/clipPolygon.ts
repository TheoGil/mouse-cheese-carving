import type { Feature, GeoJsonProperties, Polygon } from "geojson";
import * as turf from "@turf/turf";

export function clipPolygon(
  x: number,
  y: number,
  carveRadius: number,
  polygon: Feature<Polygon, GeoJsonProperties>
) {
  const clipRing = [];
  const pointsCount = 32;
  const angleIncrement = (Math.PI * 2) / pointsCount;

  for (let index = 0; index < pointsCount; index++) {
    const angle = angleIncrement * index;
    const px = x + Math.sin(angle) * carveRadius;
    const py = y + Math.cos(angle) * carveRadius;

    clipRing.push([px, py]);
  }
  clipRing.push(clipRing[0]);

  const clipPolygon = [clipRing];

  return turf.difference(
    turf.featureCollection([polygon, turf.polygon(clipPolygon)])
  );
}
