import { Vertices, Vector, Bodies, Body } from "matter-js";
import type { TriangulatedPolygon } from "./triangulatePolygon";

export function createPhysicalBodyFromTriangulatedPolygon({
  indexes,
  vertices,
  dimensions,
}: TriangulatedPolygon) {
  const triangles = [];
  for (const index of indexes) {
    triangles.push([
      vertices[index * dimensions],
      vertices[index * dimensions + 1],
    ]);
  }

  const parts: Body[] = [];

  for (let i = 0; i < triangles.length; i += 3) {
    const vertices = triangles.slice(i, i + 3);
    const mattervertices = vertices.map(([x, y]) => Vector.create(x, y));

    const centroid = Vertices.centre(mattervertices);
    const body = Bodies.fromVertices(centroid.x, centroid.y, [mattervertices]);

    parts.push(body);
  }

  return Body.create({
    parts,
  });
}
