import { Engine, Render, Runner, Bodies, Composite } from "matter-js";

export function use2DPhysics() {
  const engine = Engine.create();

  const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: document.getElementById("js-physics-canvas") as HTMLCanvasElement,
    options: {
      width: innerWidth,
      height: innerHeight,
    },
  });

  const ground = Bodies.rectangle(innerWidth / 2, innerHeight, innerWidth, 60, {
    isStatic: true,
  });

  Composite.add(engine.world, [ground]);

  Render.run(render);

  const runner = Runner.create();

  Runner.run(runner, engine);

  return {
    engine,
  };
}
