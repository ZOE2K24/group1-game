// Load stats from localStorage
function loadStats() {
    return {
        hp: parseInt(localStorage.getItem("hp")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        actions: parseInt(localStorage.getItem("actions")) || 5,
        day: parseInt(localStorage.getItem("day")) || 1,
        intelligence: parseInt(localStorage.getItem("intelligence")) || 0,
        strength: parseInt(localStorage.getItem("strength")) || 0,
    };
}

// Save stats to localStorage
function saveStats(stats) {
    localStorage.setItem("hp", stats.hp);
    localStorage.setItem("money", stats.money);
    localStorage.setItem("actions", stats.actions);
    localStorage.setItem("day", stats.day);
    localStorage.setItem("intelligence", stats.intelligence);
    localStorage.setItem("strength", stats.strength);
}

// Update stat bar dynamically
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

// Disable buttons if no actions are left
function disableActionButtons(stats) {
    const actionButtons = document.querySelectorAll(".button:not(.leave)");
    actionButtons.forEach((button) => {
        if (stats.actions <= 0) {
            button.disabled = true;
            button.style.opacity = "0.5";
            button.style.cursor = "not-allowed";
        } else {
            button.disabled = false;
            button.style.opacity = "1";
            button.style.cursor = "pointer";
        }
    });
}

// Handle Study Button
document.getElementById("study").addEventListener("click", () => {
    const stats = loadStats();
    if (stats.actions > 0) {
        stats.intelligence += 1;
        stats.actions -= 1;
        saveStats(stats);
        updateStatBar(stats);
        disableActionButtons(stats);
        addLog("Studied (+1 Intelligence).");
    }
});

// Handle Go to Class Button
document.getElementById("go-to-class").addEventListener("click", () => {
    const stats = loadStats();
    if (stats.actions > 0 && stats.money >= 20) {
        stats.intelligence += 2;
        stats.money -= 20;
        stats.actions -= 1;
        saveStats(stats);
        updateStatBar(stats);
        disableActionButtons(stats);
        addLog("Went to class (-$20, +2 Intelligence).");
    } else if (stats.money < 20) {
        addLog("Not enough money to attend class.");
        alert("You don't have enough money to go to class!");
    }
});

// Handle Go to Gym Button
document.getElementById("go-to-gym").addEventListener("click", () => {
    const stats = loadStats();
    if (stats.actions > 0) {
        stats.strength += 1;
        stats.actions -= 1;
        saveStats(stats);
        updateStatBar(stats);
        disableActionButtons(stats);
        addLog("Went to the gym (+1 Strength).");
    }
});

// Handle Leave Button
document.getElementById("leave").addEventListener("click", () => {
    const stats = loadStats();

    // Save the current stats (including actions) before leaving
    saveStats(stats);

    // Redirect to map.html
    window.location.href = "../map.html";
});


// Initialize stat bar and buttons on page load
document.addEventListener("DOMContentLoaded", () => {
    const stats = loadStats();
    updateStatBar(stats);
    disableActionButtons(stats);
});
