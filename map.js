// Core Elements
const character = document.getElementById("character");
const gameContainer = document.getElementById("game-container");
const buildings = document.querySelectorAll(".building");
const notification = createNotificationElement();
const keysPressed = {};
let position = { x: 10, y: 10 }; 
const speed = 3;

// Utility - for notif
function createNotificationElement() {
    const notif = document.createElement("div");
    notif.id = "notification";
    notif.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 5px;
        display: none;
        z-index: 200;
    `;
    document.body.appendChild(notif);
    return notif;
}

// Utility - to show notif
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => (notification.style.display = "none"), 2000);
}

// Load and Save Stats
function loadStats() {
    return {
        name: localStorage.getItem("characterName") || "Anonymous",
        hp: parseInt(localStorage.getItem("HP")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        charm: parseInt(localStorage.getItem("charm")) || 0,
        strength: parseInt(localStorage.getItem("strength")) || 0,
        intelligence: parseInt(localStorage.getItem("intelligence")) || 0,
        actions: parseInt(localStorage.getItem("actions")) || 5,
        day: parseInt(localStorage.getItem("day")) || 1,
    };
}

function saveStats(stats) {
    localStorage.setItem("HP", stats.hp);
    localStorage.setItem("money", stats.money);
    localStorage.setItem("actions", stats.actions);
    localStorage.setItem("day", stats.day);
    localStorage.setItem("charm", stats.charm);
    localStorage.setItem("strength", stats.strength);
    localStorage.setItem("intelligence", stats.intelligence);
}

// Update Stats Bar
function updateStatBar(stats) {
    document.querySelector(".hp-progress").style.width = `${(stats.hp / 100) * 100}%`;
    document.getElementById("money").textContent = `Money: $${stats.money}`;
    document.getElementById("actions-left").textContent = `Actions Left: ${stats.actions}`;
    document.getElementById("day").textContent = `Day: ${stats.day}`;
}

// Show Stats Popup
function showStats() {
    const stats = {
        name: localStorage.getItem("characterName") || "Anonymous",
        hp: parseInt(localStorage.getItem("HP")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        charm: parseInt(localStorage.getItem("charm")) || 0,
        strength: parseInt(localStorage.getItem("strength")) || 0,
        intelligence: parseInt(localStorage.getItem("intelligence")) || 0,
        actions: parseInt(localStorage.getItem("actions")) || 5,
        day: parseInt(localStorage.getItem("day")) || 1,
    };

    const statsMessage = `
        Name: ${stats.name} <br>
        HP: ${stats.hp} <br>
        Money: $${stats.money} <br>
        Charm: ${stats.charm} <br>
        Strength: ${stats.strength} <br>
        Intelligence: ${stats.intelligence} <br>
        Actions Left: ${stats.actions} <br>
        Day: ${stats.day}
    `;

    let existingPopup = document.getElementById("stats-popup");
    if (existingPopup) {
        existingPopup.remove();
    }

    const statsPopup = document.createElement("div");
    statsPopup.id = "stats-popup";
    statsPopup.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        border-radius: 10px;
        z-index: 300;
        line-height: 1.5;
    `;
    statsPopup.innerHTML = statsMessage;
    document.body.appendChild(statsPopup);

    setTimeout(() => statsPopup.remove(), 3000);
}

// Initialize Character Position
function loadCharacterPosition() {
    const savedX = localStorage.getItem("characterX");
    const savedY = localStorage.getItem("characterY");
    if (savedX && savedY) {
        position = { x: parseInt(savedX, 10), y: parseInt(savedY, 10) };
    }
    adjustPositionIfColliding();
    updateCharacterPositionOnScreen();
}

function saveCharacterPosition() {
    localStorage.setItem("characterX", position.x);
    localStorage.setItem("characterY", position.y);
}

// Update Character Position
function updateCharacterPosition() {
    if (keysPressed["w"] && position.y > 0) position.y -= speed;
    if (keysPressed["s"] && position.y < gameContainer.offsetHeight - character.offsetHeight) position.y += speed;
    if (keysPressed["a"] && position.x > 0) position.x -= speed;
    if (keysPressed["d"] && position.x < gameContainer.offsetWidth - character.offsetWidth) position.x += speed;

    updateCharacterPositionOnScreen();
    checkBuildingCollision();
}

function updateCharacterPositionOnScreen() {
    character.style.left = `${position.x}px`;
    character.style.top = `${position.y}px`;
}

// Adjust Position to Avoid Collision on Load
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
            position.x = rect2.x + rect2.width + 20;
            position.y = rect2.y + rect2.height + 20;
        }
    });
}

// Handle Building Collision
function checkBuildingCollision() {
    buildings.forEach((building) => {
        const rect1 = character.getBoundingClientRect();
        const rect2 = building.getBoundingClientRect();
        const buffer = 10;

        const adjustedRect2 = {
            x: rect2.x + buffer,
            y: rect2.y + buffer,
            width: rect2.width - 2 * buffer,
            height: rect2.height - 2 * buffer,
        };

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
                saveCharacterPosition();
                showNotification(`Entering ${building.textContent}...`);
                setTimeout(() => {
                    window.location.href = link;
                }, 2000);
            }
        }
    });
}

// Event Listeners
document.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key.toLowerCase()] = false;
});

document.getElementById("view-stats").addEventListener("click", showStats);

// Initialize on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadCharacterPosition();
    const stats = loadStats();
    updateStatBar(stats);
});

// Continuously Update Character Position
setInterval(updateCharacterPosition, 16);

// Leave Game Button 
document.getElementById("leave-game").addEventListener("click", () => {
    const confirmLeave = confirm("Are you sure you want to leave the game?");
    if (confirmLeave) {
        window.location.href = "game.html"; 
    }
});

// Download Logs  - something missing
document.getElementById("download-logs").addEventListener("click", () => {
    const blob = new Blob([logContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "game_logs.txt";
    link.click();
    URL.revokeObjectURL(url);
});
