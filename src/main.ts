import "./style.css";

import * as turf from "@turf/turf";
import { TEST_DATA_EPIC_LOGO, TEST_DATA_POLYGON_WITH_HOLE } from "./testData";
import {
  renderPolygon,
  triangulatePolygon,
  renderTriangulatedPolygon,
  use2DCanvas,
  use2DPhysics,
  createPhysicalBodyFromTriangulatedPolygon,
  translatePolygon,
  rotatePolygon,
  clipPolygon,
} from "./utils";
import { Bodies, Body, Composite, Vector } from "matter-js";
import type { Position, Feature, GeoJsonProperties, Polygon } from "geojson";

const { canvasEl, ctx } = use2DCanvas();
const { engine } = use2DPhysics();

let bodies: Body[] = [];

bodies.push(
  ...[
    // Basic rectangle
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 200, 200),
    // Basic circle
    // Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 100),
  ]
);

Composite.add(engine.world, bodies);

document.addEventListener("click", (e) => {
  const newBodies: Body[] = [];

  bodies.forEach((oldBody) => {
    const oldPolygon = createMutlipolygonFromBody(oldBody);
    console.log(oldPolygon);

    const clippedPolygon = clipPolygon(e.clientX, e.clientY, 10, oldPolygon);

    if (clippedPolygon) {
      const newPolygons = (() => {
        if (clippedPolygon.geometry.type === "Polygon") {
          return [clippedPolygon.geometry.coordinates];
        } else if (clippedPolygon.geometry.type === "MultiPolygon") {
          return clippedPolygon.geometry.coordinates;
        }

        return [];
      })();

      newPolygons.forEach((polygon) => {
        const triangulated = triangulatePolygon(turf.polygon(polygon));
        const newBody = createPhysicalBodyFromTriangulatedPolygon(triangulated);
        newBodies.push(newBody);
      });
    }
  });

  Composite.remove(engine.world, bodies);

  bodies = newBodies;
  Composite.add(engine.world, bodies);
});

/**
 * Returns a MultiPolygon representation of given MatterJS Body following the GeoJSON spec.
 */
function createMutlipolygonFromBody(body: Body) {
  console.log(body);

  return turf.polygon(
    body.parts
      .filter((bodypart) => bodypart.id !== body.id)
      .map((bodypart) => [
        ...bodypart.vertices.map(({ x, y }) => [x, y]),
        [bodypart.vertices[0].x, bodypart.vertices[0].y],
      ])
  );
}
