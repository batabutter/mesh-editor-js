let keys = {}


/**
 * Handles key presses
 * @type {function}
 * @param {KeyboardEvent} e - The keyboard event 
 */
const keyDownHandler = (e) => {
    keys[e.key] = true;
}

/**
 * Handles key releases
 * @type {function}
 * @param {KeyboardEvent} e - The keyboard event 
 */
const keyUpHandler = (e) => {
    keys[e.key] = false;
    console.log("Wha")
}


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler)

export { keys };