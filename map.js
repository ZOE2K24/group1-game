const character = document.getElementById("character");
const gameContainer = document.getElementById("game-container");
const buildings = document.querySelectorAll(".building");

let position = { x: 10, y: 10 }; // Default starting position
const speed = 3;
const keysPressed = {};

// Create notification element
const notification = document.createElement("div");
notification.id = "notification";
notification.style.position = "fixed";
notification.style.bottom = "10px";
notification.style.left = "50%";
notification.style.transform = "translateX(-50%)";
notification.style.padding = "10px 20px";
notification.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
notification.style.color = "white";
notification.style.borderRadius = "5px";
notification.style.display = "none";
document.body.appendChild(notification);

// Show notification function
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}

// Load the character's position from localStorage
function loadCharacterPosition() {
    const savedX = localStorage.getItem("characterX");
    const savedY = localStorage.getItem("characterY");

    if (savedX !== null && savedY !== null) {
        position.x = parseInt(savedX, 10);
        position.y = parseInt(savedY, 10);
    }

    // Adjust position to prevent immediate collision
    adjustPositionIfColliding();

    // Set the character's position
    character.style.left = `${position.x}px`;
    character.style.top = `${position.y}px`;
}

// Save character position to localStorage
function saveCharacterPosition() {
    localStorage.setItem("characterX", position.x);
    localStorage.setItem("characterY", position.y);
}

// Adjust position if character is colliding with a building on load
function adjustPositionIfColliding() {
    buildings.forEach((building) => {
        const rect1 = {
            x: position.x,
            y: position.y,
            width: character.offsetWidth,
            height: character.offsetHeight,
        };
        const rect2 = building.getBoundingClientRect();

        if (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        ) {
            // Move character to a safe position outside the building
            position.x = rect2.x + rect2.width + 20; // Adjust safe position X
            position.y = rect2.y + rect2.height + 20; // Adjust safe position Y
        }
    });
}

// Update the character's position based on keys pressed
function updateCharacterPosition() {
    if (keysPressed["w"] && position.y > 0) position.y -= speed; // Move up
    if (keysPressed["s"] && position.y < gameContainer.offsetHeight - character.offsetHeight) position.y += speed; // Move down
    if (keysPressed["a"] && position.x > 0) position.x -= speed; // Move left
    if (keysPressed["d"] && position.x < gameContainer.offsetWidth - character.offsetWidth) position.x += speed; // Move right

    character.style.top = `${position.y}px`;
    character.style.left = `${position.x}px`;

    checkBuildingCollision();
}

// Check if the character collides with a building
function checkBuildingCollision() {
    buildings.forEach((building) => {
        const rect1 = character.getBoundingClientRect();
        const rect2 = building.getBoundingClientRect();

        // Create a smaller collision box for the building
        const buffer = 10; // Adjust this value to fine-tune sensitivity
        const adjustedRect2 = {
            x: rect2.x + buffer,
            y: rect2.y + buffer,
            width: rect2.width - 2 * buffer,
            height: rect2.height - 2 * buffer,
        };

        // Check collision with adjusted building rectangle
        if (
            rect1.x < adjustedRect2.x + adjustedRect2.width &&
            rect1.x + rect1.width > adjustedRect2.x &&
            rect1.y < adjustedRect2.y + adjustedRect2.height &&
            rect1.y + rect1.height > adjustedRect2.y
        ) {
            const link = building.getAttribute("data-link");
            if (link) {
                const stats = loadStats();
                if (stats.actions <= 0) {
                    showNotification("You are out of actions! Sleep to replenish.");
                    return;
                }

                saveCharacterPosition(); // Save position before redirecting
                showNotification(`Entering ${building.textContent}...`);
                setTimeout(() => {
                    window.location.href = link; // Redirect to the building's page
                }, 2000); // Wait for notification to display
            }
        }
    });
}

// Load stats from localStorage
function loadStats() {
    return {
        hp: parseInt(localStorage.getItem("hp")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        actions: parseInt(localStorage.getItem("actions")) || 5,
        day: parseInt(localStorage.getItem("day")) || 1,
    };
}

// Save stats to localStorage
function saveStats(stats) {
    localStorage.setItem("hp", stats.hp);
    localStorage.setItem("money", stats.money);
    localStorage.setItem("actions", stats.actions);
    localStorage.setItem("day", stats.day);
}

// Update the stat bar dynamically
function updateStatBar(stats) {
    const hpProgress = document.querySelector(".hp-progress");
    if (hpProgress) {
        hpProgress.style.width = `${(stats.hp / 100) * 100}%`;
    }

    const moneyElement = document.getElementById("money");
    if (moneyElement) {
        moneyElement.textContent = `Money: $${stats.money}`;
    }

    const actionsElement = document.getElementById("actions-left");
    if (actionsElement) {
        actionsElement.textContent = `Actions Left: ${stats.actions}`;
    }

    const dayElement = document.getElementById("day");
    if (dayElement) {
        dayElement.textContent = `Day: ${stats.day}`;
    }
}

// Listen for key presses to move the character
document.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key.toLowerCase()] = false;
});

// Initialize character position and stat bar on page load
document.addEventListener("DOMContentLoaded", () => {
    loadCharacterPosition();

    // Load stats and update the stat-bar
    const stats = loadStats();
    updateStatBar(stats);
});

// Continuously update the character's position
setInterval(updateCharacterPosition, 16);
