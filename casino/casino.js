// Load stats from localStorage
function loadStats() {
    return {
        hp: parseInt(localStorage.getItem("hp")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        actions: parseInt(localStorage.getItem("actions")) || 5,
        day: parseInt(localStorage.getItem("day")) || 1,
    };
}

// Update the stat bar dynamically
function updateStatBar(stats) {
    document.querySelector(".hp-progress").style.width = `${(stats.hp / 100) * 100}%`;
    document.getElementById("money").textContent = `Money: $${stats.money}`;
    document.getElementById("actions-left").textContent = `Actions Left: ${stats.actions}`;
    document.getElementById("day").textContent = `Day: ${stats.day}`;
}

// Initialize stat bar
const stats = loadStats();
updateStatBar(stats);

// Click event handlers for casino options
document.getElementById("play-slots").addEventListener("click", () => {
    alert("Slots game coming soon!");
});

document.getElementById("play-roulette").addEventListener("click", () => {
    alert("Roulette game coming soon!");
});

document.getElementById("play-color-game").addEventListener("click", () => {
    alert("Color Game coming soon!");
});

// Leave button
document.getElementById("leave").addEventListener("click", () => {
    window.location.href = "../map.html"; 
});

