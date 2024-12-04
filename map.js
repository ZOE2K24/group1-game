const character = document.getElementById("character");
const gameContainer = document.getElementById("game-container");
const buildings = document.querySelectorAll(".building");

let position = { x: 10, y: 10 };
const speed = 5;
const keysPressed = {};

document.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key.toLowerCase()] = false;
});

function updateCharacterPosition() {
    if (keysPressed["w"] && position.y > 0) position.y -= speed; // Move up
    if (keysPressed["s"] && position.y < gameContainer.offsetHeight - character.offsetHeight) position.y += speed; // Move down
    if (keysPressed["a"] && position.x > 0) position.x -= speed; // Move left
    if (keysPressed["d"] && position.x < gameContainer.offsetWidth - character.offsetWidth) position.x += speed; // Move right

    character.style.top = `${position.y}px`;
    character.style.left = `${position.x}px`;

    checkBuildingCollision();
}

function checkBuildingCollision() {
    buildings.forEach((building) => {
        const rect1 = character.getBoundingClientRect();
        const rect2 = building.getBoundingClientRect();

        if (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        ) {
            const link = building.getAttribute("data-link");
            if (link) {
                alert(`Entering ${building.textContent}...`);
                window.location.href = link;
            }
        }
    });
}

// Continuously update position
setInterval(updateCharacterPosition, 16);
