// Load stats from localStorage
function loadStats() {
    return {
        hp: parseInt(localStorage.getItem("hp")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        actions: parseInt(localStorage.getItem("actions")) || 5,
        charm: parseInt(localStorage.getItem("charm")) || 0,
        day: parseInt(localStorage.getItem("day")) || 1,
    };
}

// Save stats to localStorage
function saveStats(stats) {
    localStorage.setItem("hp", stats.hp);
    localStorage.setItem("money", stats.money);
    localStorage.setItem("actions", stats.actions);
    localStorage.setItem("charm", stats.charm);
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

// Handle Drink Beer Button
document.getElementById("drink-beer").addEventListener("click", () => {
    const stats = loadStats();

    if (stats.money < 20) {
        alert("You don't have enough money to buy a drink!");
        return;
    }

    stats.money -= 20;
    stats.charm += 2; // Increase charm
    saveStats(stats);
    updateStatBar(stats);
    alert("You feel charming! (+2 Charm)");
});

// Handle Buy Beer Button
document.getElementById("buy-beer").addEventListener("click", () => {
    const stats = loadStats();

    if (stats.money < 30) {
        alert("You don't have enough money to buy a bottle of beer!");
        return;
    }

    stats.money -= 30;
    saveStats(stats);
    updateStatBar(stats);
    alert("You bought a bottle of beer!");
});

// Handle Bar Fight Button
document.getElementById("bar-fight").addEventListener("click", () => {
    // Redirect to bar-fight.html without deducting actions
    window.location.href = "bar-fight.html";
});

// Handle Leave Button
document.getElementById("leave").addEventListener("click", () => {
    // Move character back to a safe position on the map
    localStorage.setItem("characterX", 300);
    localStorage.setItem("characterY", 300);
    window.location.href = "../map.html";
});

// Initialize the stat bar on page load
document.addEventListener("DOMContentLoaded", () => {
    const stats = loadStats();
    updateStatBar(stats);
});
