import "./style.css";

import * as turf from "@turf/turf";
import { TEST_DATA_POLYGON_WITH_HOLE } from "./testData";
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
import { Body, Composite, Vector } from "matter-js";
import type { Position, Feature, GeoJsonProperties, Polygon } from "geojson";

class CustomPolygon {
  geojson: Feature<Polygon, GeoJsonProperties>;
  matterBody: Body;
  initialPosition: Vector;

  constructor(definition: Position[][]) {
    this.geojson = turf.polygon(definition);

    const triangulatedPolygon = triangulatePolygon(this.geojson);
    this.matterBody =
      createPhysicalBodyFromTriangulatedPolygon(triangulatedPolygon);
    this.initialPosition = Vector.clone(this.matterBody.position);
  }
}

const { canvasEl, ctx } = use2DCanvas();
const { engine } = use2DPhysics();

let polygons = [
  new CustomPolygon(TEST_DATA_POLYGON_WITH_HOLE),
  new CustomPolygon([
    [
      [300, 0],
      [500, 0],
      [500, 200],
      [300, 200],
      [300, 0],
    ],
  ]),
];

Composite.add(
  engine.world,
  polygons.map((p) => p.matterBody)
);

document.addEventListener("pointerdown", (e) => {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  const newPolygons: CustomPolygon[] = [];

  polygons.forEach((p) => {
    const translatedPolygon = translatePolygon(
      p.geojson,
      p.matterBody.position.x - p.initialPosition.x,
      p.matterBody.position.y - p.initialPosition.y
    );

    const rotatedPolygon = rotatePolygon(
      translatedPolygon,
      p.matterBody.angle,
      p.matterBody.position
    );

    const clipped = clipPolygon(e.clientX, e.clientY, 10, rotatedPolygon);

    if (clipped) {
      switch (clipped.geometry.type) {
        case "Polygon":
          newPolygons.push(new CustomPolygon(clipped.geometry.coordinates));
          break;
        case "MultiPolygon":
          clipped.geometry.coordinates.forEach((coordinates) => {
            newPolygons.push(new CustomPolygon(coordinates));
          });
          break;
        default:
          break;
      }
    }
  });

  Composite.remove(
    engine.world,
    polygons.map((p) => p.matterBody)
  );

  polygons = newPolygons;

  Composite.add(
    engine.world,
    polygons.map((p) => p.matterBody)
  );
});
