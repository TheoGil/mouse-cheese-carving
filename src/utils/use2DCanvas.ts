const canvasEl = document.getElementById("js-canvas") as HTMLCanvasElement;
const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

export function use2DCanvas() {
  return {
    canvasEl,
    ctx,
  };
}
