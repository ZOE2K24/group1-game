// Load stats from localStorage
function loadStats() {
    return {
        hp: parseInt(localStorage.getItem("hp")) || 100,
        money: parseInt(localStorage.getItem("money")) || 100,
        bank: parseInt(localStorage.getItem("bank")) || 0, 
        actions: parseInt(localStorage.getItem("actions")) || 5,
        day: parseInt(localStorage.getItem("day")) || 1,
    };
}

// Save stats to localStorage
function saveStats(stats) {
    localStorage.setItem("hp", stats.hp);
    localStorage.setItem("money", stats.money);
    localStorage.setItem("bank", stats.bank); 
    localStorage.setItem("actions", stats.actions);
    localStorage.setItem("day", stats.day);
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

// Apply daily interest to the bank balance
function applyInterest(stats) {
    const interestRate = 0.03; 
    stats.bank = Math.floor(stats.bank * (1 + interestRate)); 
    saveStats(stats); 
}

// Handle Sleep Button
document.getElementById("sleep").addEventListener("click", () => {
    const stats = loadStats();

    // Update stats for sleeping
    stats.hp = 100; 
    stats.actions = 5; 
    stats.day += 1; 

    // Apply interest to the bank balance
    applyInterest(stats);

    // Save updated stats
    saveStats(stats);

    // Update stat bar
    updateStatBar(stats);

    // Show notification (instead of alert)
    const notification = document.createElement("div");
    notification.textContent = "You slept well! HP and actions replenished. It's the next day.";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.background = "#4caf50";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
});

// Handle Save Button
document.getElementById("save").addEventListener("click", () => {
    const stats = loadStats();
    saveStats(stats);

    // Show save notification
    const notification = document.createElement("div");
    notification.textContent = "Game progress saved successfully!";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.background = "#2196f3";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
});

// Leave Button
document.getElementById("leave").addEventListener("click", () => {
    localStorage.setItem("characterX", 300); 
    localStorage.setItem("characterY", 300);

    window.location.href = "../map.html";
});

// Initialize stat bar on page load
document.addEventListener("DOMContentLoaded", () => {
    const stats = loadStats();
    updateStatBar(stats);
});
