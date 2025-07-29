/**
 * Returns a value linearly interpolated from two known points based on the given interval -
 * `t = 0` will return `x` and `t = 1` will return `y`.
 *
 * @param {number} x - The start point
 * @param {number} y - The end point.
 * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
 * @return {number} The interpolated value.
 *
 * https://github.com/mrdoob/three.js/blob/master/src/math/MathUtils.js#L114
 */
export function lerp(x: number, y: number, t: number) {
  return (1 - t) * x + t * y;
}
