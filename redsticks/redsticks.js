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

// Handle food item buttons
document.getElementById("milkshake").addEventListener("click", () => {
    handleFoodPurchase(8, 12, "Milkshake");
});

document.getElementById("fries").addEventListener("click", () => {
    handleFoodPurchase(12, 20, "Fries");
});

document.getElementById("cheeseburger").addEventListener("click", () => {
    handleFoodPurchase(25, 40, "Cheeseburger");
});

document.getElementById("triple-burger").addEventListener("click", () => {
    handleFoodPurchase(50, 80, "Triple Burger");
});

// Handle Leave Button
document.getElementById("leave").addEventListener("click", () => {
    localStorage.setItem("characterX", 300); // Adjust as needed
    localStorage.setItem("characterY", 300); // Adjust as needed
    window.location.href = "../map.html";
});

// Function to handle food purchases
function handleFoodPurchase(cost, hpGain, itemName) {
    const stats = loadStats();

    if (stats.money < cost) {
        alert(`You don't have enough money to buy ${itemName}!`);
        return;
    }

    stats.money -= cost;
    stats.hp = Math.min(100, stats.hp + hpGain); // Ensure HP doesn't exceed 100
    saveStats(stats);
    updateStatBar(stats);
    alert(`You bought a ${itemName} and gained ${hpGain} HP!`);
}

// Initialize the stat bar on page load
document.addEventListener("DOMContentLoaded", () => {
    const stats = loadStats();
    updateStatBar(stats);
});
