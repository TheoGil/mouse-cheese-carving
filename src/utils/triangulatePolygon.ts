import earcut, { flatten } from "earcut";
import type { Feature, GeoJsonProperties, Polygon } from "geojson";

export interface TriangulatedPolygon {
  vertices: number[];
  holes: number[];
  dimensions: number;
  indexes: number[];
}

// Worth checking out? I think it does exactly this
// https://turfjs.org/docs/api/tesselate

export function triangulatePolygon(
  polygon: Feature<Polygon, GeoJsonProperties>
): TriangulatedPolygon {
  const { vertices, holes, dimensions } = flatten(polygon.geometry.coordinates);
  const indexes = earcut(vertices, holes, dimensions);

  return {
    vertices,
    holes,
    dimensions,
    indexes,
  };
}
