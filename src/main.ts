import "./style.css";

import * as turf from "@turf/turf";
import type { Feature, GeoJsonProperties, Polygon } from "geojson";
import { TEST_DATA_POLYGON_WITH_HOLE } from "./testData";
import {
  renderPolygon,
  triangulatePolygon,
  renderTriangulatedPolygon,
  use2DCanvas,
  use2DPhysics,
  createPhysicalBodyFromTriangulatedPolygon,
} from "./utils";
import { Body, Composite } from "matter-js";

const { canvasEl, ctx } = use2DCanvas();
const { engine } = use2DPhysics();

const test = turf.polygon(TEST_DATA_POLYGON_WITH_HOLE);
renderPolygon(test, ctx);
console.log("test1", test);

const triangulatedPolygon = triangulatePolygon(test);
// renderTriangulatedPolygon(triangulatedPolygon, ctx);
const body = createPhysicalBodyFromTriangulatedPolygon(triangulatedPolygon);
Composite.add(engine.world, body);
const initialBodyPosition = structuredClone(body.position);
const initialBodyRotation = body.angle;

Body.rotate(body, 2);

document.addEventListener("pointerdown", () => {
  function translatePolygon(
    polygon: Feature<Polygon, GeoJsonProperties>,
    x: number,
    y: number
  ) {
    const newPolygon = polygon.geometry.coordinates.map((ring) =>
      ring.map(([oldX, oldY]) => [oldX + x, oldY + y])
    );

    return turf.polygon(newPolygon);
  }

  console.log(body.angle, initialBodyRotation);

  const test2 = translatePolygon(
    test,
    body.position.x - initialBodyPosition.x,
    body.position.y - initialBodyPosition.y
  );

  console.log(test2);
  // DOES NOT WORK : https://github.com/Turfjs/turf/issues/1920
  // NEED TO COMPUTE ROTATION MYSELF
  const test3 = turf.transformRotate(test, body.angle - initialBodyRotation);

  // console.log("test2", test2);
  // ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  // renderPolygon(test3, ctx);
});

// console.log(turf);
