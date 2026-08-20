const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 800;
const POINT_SIZE = 10;
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
        x: (x / z + 1) / 2 * WIDTH,
        y: (-y / z + 1) / 2 * HEIGHT,
    }
)
/**
 * Draws a point on the screen
 * @param {Vec3} p - Point with x and y coords
 * @returns {void}
*/
const drawPoint = (p) => {
    ctx.fillStyle = "green";
    const { x, y } = project_to_screen(p);
    ctx.fillRect(x - POINT_SIZE / 2, y - POINT_SIZE / 2, POINT_SIZE, POINT_SIZE);
}

/** 
 * Draws a line on the screen given two points
 * @param {Vec3} p1 - Point 1 wuth x, y, z coords
 * @param {Vec3} p2 - Point 2 with x, y, z coords 
 * @returns {void}
*/
const drawLine = (p1, p2) => {
    ctx.strokeStyle = "green"
    const d_p1 = project_to_screen(p1);
    const d_p2 = project_to_screen(p2);

    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(d_p1.x, d_p1.y);
    ctx.lineTo(d_p2.x, d_p2.y);
    ctx.stroke();
}

/**
 * Translates the points by a z value
 * @param {Vec3} p - Point to translate
 * @param {number} dz - Translates by dz
 * @returns {void}
*/
const translate_z = ({ x, y, z }, dz) => {
    return { x: x, y: y, z: z + dz };
}

/**
 * Rotates a given point by radians along the y-axis
 * @param {Vec3} p - Point to rotate
 * @param {number} radians - Rotation amount
 */
const rotate_y = ({ x, y, z }, radians) => (
    {
        x: x * Math.sin(radians) + z * Math.cos(radians),
        y: y,
        z: x * Math.cos(radians) - z * Math.sin(radians),
    }
)

/**
 * A Mesh that holds an array of three vertices, [v0, v1, v2] intended to be rendered in order v0->v1->v2
 * @typedef {Object} Mesh
 * @property {Array<Vec3>} verts
 */

/** Draws a mesh on the screen
 * @property {Mesh} mesh - Mesh to render
 * @returns {void}
*/
const drawMesh = (mesh) => {
    const verts = mesh.verts
    for (let i = 0; i < verts.length / 3; i += 3) {
        drawLine(verts[i], verts[(i + 1)]);
        drawLine(verts[i + 1], verts[(i + 2)]);
        drawLine(verts[i + 2], verts[i]);
    }
}

const clear_background = () => {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}


const points = [
    { x: -0.75, y: 0.75, z: 0 },
    { x: 0.75, y: 0.75, z: 0 },
    { x: -0.75, y: -0.75, z: 0 },
    { x: 0.75, y: -0.75, z: 0 },

    { x: -0.75, y: 0.75, z: 1 },
    { x: 0.75, y: 0.75, z: 1 },
    { x: -0.75, y: -0.75, z: 1 },
    { x: 0.75, y: -0.75, z: 1 },
]

// Clockwise winding order
const meshArr = [
    {
        verts: [points[0], points[1], points[2]]
    },
    {
        verts: [points[2], points[1], points[3]]
    },
]

let dz = 2;
let dtheta = 0;

const frame = () => {
    const dt = 1 / TARGET_FPS;
    clear_background();
    dz += dt * 0.25;
    dtheta += dt * 2 * Math.PI / 4;

    const meshArr = [
        {
            verts: [points[0], points[1], points[2]]
        },
        {
            verts: [points[2], points[1], points[3]]
        },

        {
            verts: [points[0], points[4], points[5]]
        },
        {
            verts: [points[0], points[5], points[1]]
        },

        {
            verts: [points[0], points[4], points[6]]
        },
        {
            verts: [points[0], points[6], points[2]]
        },

        {
            verts: [points[5], points[1], points[3]]
        },
        {
            verts: [points[5], points[3], points[7]]
        },

        {
            verts: [points[5], points[4], points[6]]
        },
        {
            verts: [points[5], points[6], points[7]]
        },

        {
            verts: [points[7], points[6], points[2]]
        },
        {
            verts: [points[7], points[2], points[3]]
        },
    ]

    for (const point of points) {
        drawPoint(translate_z(rotate_y(point, dtheta), dz));
    }

    for (const mesh of meshArr) {
        for (let i = 0; i < mesh.verts.length; i++) {
            mesh.verts[i] = translate_z(rotate_y(mesh.verts[i], dtheta), dz)
        }
        drawMesh(mesh);
    }


    setTimeout(frame, 1000 / TARGET_FPS);
}

setTimeout(frame, 1000 / TARGET_FPS);