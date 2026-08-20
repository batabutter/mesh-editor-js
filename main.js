const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 800;
const POINT_SIZE = 20;
const BACKGROUND = "#383838"
const TARGET_FPS = 60;

canvas.width = WIDTH;
canvas.height = HEIGHT;

/**
 * @typedef {Object} Vec3
 * @property {number} x - x coordinate of the point
 * @property {number} y - y coordinate of the point
 * @property {number} z - z coordinate of the point
*/

/**
 * Projects a Vec3 to a point on screen
 * @param {Vec3} - Point to project
 * @returns {Vec3} - Projected point
 */
const project_to_screen = ({ x, y, z }) => (
    {
        x: (x / z + 1) / 2 * WIDTH - POINT_SIZE / 2,
        y: (-y / z + 1) / 2 * HEIGHT - POINT_SIZE / 2,
    }
)
/**
 * Draws a point on the screen
 * @param {Vec3} p - Point with x and y coords
 * @returns {void}
 */
const point = (p) => {
    ctx.fillStyle = "green";
    const { x, y } = project_to_screen(p);
    ctx.fillRect(x, y, POINT_SIZE, POINT_SIZE);
}


const clear_background = () => {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
clear_background();

let dz = 1;

const frame = () => {
    const dt = 1 / TARGET_FPS;
    clear_background();
    dz += dt * 1;
    point({ x: -0.75, y: 0.75, z: dz });
    point({ x: 0.75, y: 0.75, z: dz });
    point({ x: -0.75, y: -0.75, z: dz });
    point({ x: 0.75, y: -0.75, z: dz });
    setTimeout(frame, 1000 / TARGET_FPS);
}
setTimeout(frame, 1000 / TARGET_FPS);