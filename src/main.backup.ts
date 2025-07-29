import "./style.css";

// https://chanind.github.io/curve-matcher/index.html
// https://github.com/Louis-T/fernandez-polygon-decomposition

import * as turf from "@turf/turf";
import polygonClipping, {
  type MultiPolygon,
  type Polygon,
  type Ring,
} from "polygon-clipping";
import earcut, { flatten } from "earcut";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Vector,
  Body,
  Vertices,
} from "matter-js";
import { decompose, orderClockwise } from "fernandez-polygon-decomposition";

////////////////////
////////////////////
////////////////////

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  canvas: document.getElementById("js-physics-canvas") as HTMLCanvasElement,
  options: {
    width: innerWidth,
    height: innerHeight,
  },
});

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(innerWidth / 2, innerHeight, innerWidth, 60, {
  isStatic: true,
});

// add all of the bodies to the world
Composite.add(engine.world, [ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
////////////////////
////////////////////
////////////////////

const canvasEl = document.getElementById("js-canvas") as HTMLCanvasElement;
const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
updateCanvasSize();

const mouse = {
  x: 0,
  y: 0,
};

// let multipolygon: MultiPolygon = computeInitialMultypolygon();
let multipolygon: MultiPolygon = [
  [
    [
      [445.875, 227.75],
      [743.125, 227.75],
      [743.125, 683.25],
      [445.875, 683.25],
      [445.875, 227.75],
    ],
    [
      [541, 359],
      [541.1921471959677, 360.9509032201613],
      [541.7612046748872, 362.82683432365087],
      [542.143579962982, 363.5422081715965],
      [542, 365],
      [542.1921471959677, 366.9509032201613],
      [542.2070405413075, 367],
      [542.1921471959677, 367.0490967798387],
      [542, 369],
      [542.1921471959677, 370.9509032201613],
      [542.7612046748872, 372.82683432365087],
      [543.6853038769746, 374.555702330196],
      [544.0499295513973, 375],
      [543.6853038769746, 375.444297669804],
      [542.7612046748872, 377.17316567634913],
      [542.1921471959677, 379.0490967798387],
      [542, 381],
      [542.1921471959677, 382.9509032201613],
      [542.7612046748872, 384.82683432365087],
      [543.6853038769746, 386.555702330196],
      [544.9289321881346, 388.0710678118655],
      [546.444297669804, 389.31469612302544],
      [548.1731656763491, 390.23879532511285],
      [549.0497077703925, 390.50469146238316],
      [549.1921471959677, 391.9509032201613],
      [549.7612046748872, 393.82683432365087],
      [550.6853038769746, 395.555702330196],
      [551.9289321881346, 397.0710678118655],
      [553.444297669804, 398.31469612302544],
      [555.1731656763491, 399.23879532511285],
      [557.0490967798387, 399.8078528040323],
      [557.7900670365987, 399.88083200446647],
      [558.6853038769746, 401.555702330196],
      [559.9289321881346, 403.0710678118655],
      [561.444297669804, 404.31469612302544],
      [563.1731656763491, 405.23879532511285],
      [565.0490967798387, 405.8078528040323],
      [567, 406],
      [568.9509032201613, 405.8078528040323],
      [570.8268343236509, 405.23879532511285],
      [572.3836616749156, 404.4066537691091],
      [572.9289321881346, 405.0710678118655],
      [574.444297669804, 406.31469612302544],
      [576.1731656763491, 407.23879532511285],
      [578.0490967798387, 407.8078528040323],
      [580, 408],
      [581.9509032201613, 407.8078528040323],
      [583.8268343236509, 407.23879532511285],
      [585.555702330196, 406.31469612302544],
      [587.0710678118654, 405.0710678118655],
      [588.3146961230254, 403.555702330196],
      [588.7486644508195, 402.743804694009],
      [589.444297669804, 403.31469612302544],
      [591.1731656763491, 404.23879532511285],
      [593.0490967798387, 404.8078528040323],
      [595, 405],
      [596.9509032201613, 404.8078528040323],
      [598.8268343236509, 404.23879532511285],
      [600.555702330196, 403.31469612302544],
      [602.0710678118654, 402.0710678118655],
      [603.3146961230254, 400.555702330196],
      [604.2099329634013, 398.88083200446647],
      [604.9509032201613, 398.8078528040323],
      [606.8268343236509, 398.23879532511285],
      [608.555702330196, 397.31469612302544],
      [610.0710678118654, 396.0710678118655],
      [611.3146961230254, 394.555702330196],
      [612.2387953251128, 392.82683432365087],
      [612.6720709224102, 391.39851609664805],
      [613.0710678118654, 391.0710678118655],
      [614.3146961230254, 389.555702330196],
      [615.2387953251128, 387.82683432365087],
      [615.8078528040323, 385.9509032201613],
      [616, 384],
      [615.8078528040323, 382.0490967798387],
      [615.2387953251128, 380.17316567634913],
      [614.7451746192821, 379.24966629040534],
      [615.3146961230254, 378.555702330196],
      [616.2387953251128, 376.82683432365087],
      [616.8078528040323, 374.9509032201613],
      [617, 373],
      [616.8078528040323, 371.0490967798387],
      [616.2387953251128, 369.17316567634913],
      [615.3146961230254, 367.444297669804],
      [614.3923980021224, 366.3204741578404],
      [614.8078528040323, 364.9509032201613],
      [615, 363],
      [614.8078528040323, 361.0490967798387],
      [614.2387953251128, 359.17316567634913],
      [613.3146961230254, 357.444297669804],
      [612.0710678118654, 355.9289321881345],
      [610.555702330196, 354.68530387697456],
      [609.8701051495452, 354.31884454914024],
      [610, 353],
      [609.8078528040323, 351.0490967798387],
      [609.2387953251128, 349.17316567634913],
      [608.3146961230254, 347.444297669804],
      [607.0710678118654, 345.9289321881345],
      [605.555702330196, 344.68530387697456],
      [604.832437643894, 344.29871084790614],
      [604.8078528040323, 344.0490967798387],
      [604.2387953251128, 342.17316567634913],
      [603.3146961230254, 340.444297669804],
      [602.0710678118654, 338.9289321881345],
      [600.555702330196, 337.68530387697456],
      [598.8268343236509, 336.76120467488715],
      [596.9509032201613, 336.1921471959677],
      [596.2287078768633, 336.12101716310826],
      [596.0710678118654, 335.9289321881345],
      [594.555702330196, 334.68530387697456],
      [592.8268343236509, 333.76120467488715],
      [590.9509032201613, 333.1921471959677],
      [589, 333],
      [587.0490967798387, 333.1921471959677],
      [585.1731656763491, 333.76120467488715],
      [583.444297669804, 334.68530387697456],
      [581.9289321881346, 335.9289321881345],
      [581.9103393954143, 335.95158757161465],
      [581.0710678118654, 334.9289321881345],
      [579.555702330196, 333.68530387697456],
      [577.8268343236509, 332.76120467488715],
      [575.9509032201613, 332.1921471959677],
      [574, 332],
      [572.0490967798387, 332.1921471959677],
      [570.1731656763491, 332.76120467488715],
      [568.4922060695982, 333.65969630377896],
      [566.9509032201613, 333.1921471959677],
      [565, 333],
      [563.0490967798387, 333.1921471959677],
      [561.1731656763491, 333.76120467488715],
      [559.444297669804, 334.68530387697456],
      [557.9289321881346, 335.9289321881345],
      [556.6853038769746, 337.444297669804],
      [555.7612046748872, 339.17316567634913],
      [555.4953085376168, 340.0497077703925],
      [554.0490967798387, 340.1921471959677],
      [552.1731656763491, 340.76120467488715],
      [550.444297669804, 341.68530387697456],
      [548.9289321881346, 342.9289321881345],
      [547.6853038769746, 344.444297669804],
      [546.7612046748872, 346.17316567634913],
      [546.1921471959677, 348.0490967798387],
      [546, 350],
      [546.0363291881738, 350.36885643757205],
      [545.444297669804, 350.68530387697456],
      [543.9289321881346, 351.9289321881345],
      [542.6853038769746, 353.444297669804],
      [541.7612046748872, 355.17316567634913],
      [541.1921471959677, 357.0490967798387],
      [541, 359],
    ],
  ],
];

let bodies: Body[] = [];

const CARVE_RADIUS = 10;

function computeInitialMultypolygon(): MultiPolygon {
  const width = window.innerWidth / 4;
  const height = window.innerHeight / 2;

  // GeoJSON syntax is kind of puzzling. What are "Ring"? Dunno...
  const ring = [
    [innerWidth / 2 - width / 2, innerHeight / 2 - height / 2],
    [innerWidth / 2 + width / 2, innerHeight / 2 - height / 2],
    [innerWidth / 2 + width / 2, innerHeight / 2 + height / 2],
    [innerWidth / 2 - width / 2, innerHeight / 2 + height / 2],
  ] as Ring;

  const polygon = [ring];

  const multipolygon = [polygon];

  return multipolygon;
}

function onResize() {
  updateCanvasSize();
}

function updateCanvasSize() {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
}

// Update the mouse position relative to the top left corner of canvas
function onMouseMove(e: MouseEvent) {
  const { left, top } = canvasEl.getBoundingClientRect();
  mouse.x = e.clientX - left;
  mouse.y = e.clientY - top;
}

function drawMultipolygon(multipolygon: MultiPolygon) {
  multipolygon.forEach((polygon) => {
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
  });
}

function drawTriangulatedPolygon(
  triangulatedPolygon: number[],
  vertices: number[],
  dimensions: number
) {
  const triangles = [];
  for (const index of triangulatedPolygon) {
    triangles.push([
      vertices[index * dimensions],
      vertices[index * dimensions + 1],
    ]);
  }

  for (let i = 0; i < triangles.length; i += 3) {
    const vertices = triangles.slice(i, i + 3);

    drawPoly(vertices, "#1B3C53", "#D2C1B6");
  }

  // https://github.com/mapbox/earcut/blob/main/viz/viz.js
  function drawPoly(rings, color, fill) {
    ctx.beginPath();

    ctx.strokeStyle = color;
    if (fill && fill !== true) ctx.fillStyle = fill;

    if (typeof rings[0][0] === "number") rings = [rings];

    for (const points of rings) {
      for (let i = 0; i < points.length; i++) {
        // const x = (points[i][0] - minX) * ratio + 5,
        //   y = (points[i][1] - minY) * ratio + 5;

        const x = points[i][0];
        const y = points[i][1];

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      if (fill) ctx.closePath();
    }
    ctx.stroke();

    if (fill && fill !== true) ctx.fill("evenodd");
  }
}

function triangulateMultipolygon() {
  multipolygon.forEach((polygon) => {
    const { vertices, holes, dimensions } = flatten(polygon);
    const indexes = earcut(vertices, holes, dimensions);

    // drawTriangulatedPolygon(indexes, vertices, dimensions);
    createPhysicalBodyFromTriangulatedPolygon(indexes, vertices, dimensions);
  });
}

function createPhysicalBodyFromTriangulatedPolygon(
  indexes: number[],
  vertices: number[],
  dimensions: number
) {
  const triangles = [];
  for (const index of indexes) {
    triangles.push([
      vertices[index * dimensions],
      vertices[index * dimensions + 1],
    ]);
  }

  const parts: Body[] = [];

  console.clear();

  for (let i = 0; i < triangles.length; i += 3) {
    const vertices = triangles.slice(i, i + 3);
    const mattervertices = vertices.map(([x, y]) => Vector.create(x, y));

    const centroid = Vertices.centre(mattervertices);
    const body = Bodies.fromVertices(centroid.x, centroid.y, [mattervertices]);

    parts.push(body);
  }

  const compoundBody = Body.create({
    parts,
  });

  bodies.push(compoundBody);

  Composite.add(engine.world, compoundBody);
}

function onPointerDown() {
  computeMultipolygonFromPhysicalBodies();

  const clipRing: Ring = [];
  const pointsCount = 32;
  const angleIncrement = (Math.PI * 2) / pointsCount;
  for (let index = 0; index < pointsCount; index++) {
    const angle = angleIncrement * index;
    const x = mouse.x + Math.sin(angle) * CARVE_RADIUS;
    const y = mouse.y + Math.cos(angle) * CARVE_RADIUS;

    clipRing.push([x, y]);
  }
  const clipPolygon: Polygon = [clipRing];

  multipolygon = polygonClipping.difference(multipolygon, [clipPolygon]);

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  // drawMultipolygon(multipolygon);

  Composite.remove(engine.world, bodies);
  bodies = [];

  triangulateMultipolygon();
}

function getRandomColor() {
  return `rgba(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  }, 0.25)`;
}

function computeMultipolygonFromPhysicalBodies() {
  const polygons: MultiPolygon = [];

  bodies.forEach((body) => {
    body.parts.forEach((bodypart) => {
      if (body.id !== bodypart.id) {
        const ring: Ring = bodypart.vertices.map(({ x, y }) => [
          Math.round(x),
          Math.round(y),
        ]);
        // ring.push([ring[0][0], ring[0][1]]);

        const polygon: Polygon = [ring];
        polygons.push(polygon);
      }
    });
  });

  multipolygon = polygons;
}

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("resize", onResize);
window.addEventListener("pointerdown", onPointerDown);

// triangulateMultipolygon();

drawMultipolygon(multipolygon);
triangulateMultipolygon();

const test = turf.polygon(multipolygon[0]);
console.log(test);
