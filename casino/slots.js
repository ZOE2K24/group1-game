// Symbols for the slot machine
const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇", "⭐"];

// Adjusted weights for the symbols (higher weight = more likely to appear)
const symbolWeights = [1.0, 0.2, 0.15, 0.1, 0.1, 0.05]; 

// Elements
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const spinButton = document.getElementById("spin");
const leaveButton = document.getElementById("leave");

// Function to get a random symbol based on weights
function getRandomSymbol() {
    const totalWeight = symbolWeights.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (let i = 0; i < symbols.length; i++) {
        cumulativeWeight += symbolWeights[i];
        if (random <= cumulativeWeight) {
            return symbols[i];
        }
    }
    return symbols[symbols.length - 1]; 
}

// Load stats from localStorage
function loadStats() {
    return {
        money: parseInt(localStorage.getItem("money")) || 100,
    };
}

// Save stats to localStorage
function saveStats(stats) {
    localStorage.setItem("money", stats.money);
}

// Update stat bar dynamically
function updateStatBar(stats) {
    const moneyElement = document.getElementById("money");
    if (moneyElement) {
        moneyElement.textContent = `Money: $${stats.money}`;
    }
}

// Slots animation
function spinSlot(slotElement) {
    return new Promise((resolve) => {
        let iterations = 20; 
        let interval = setInterval(() => {
            const randomSymbol = getRandomSymbol();
            slotElement.textContent = randomSymbol;
            iterations--;
            if (iterations === 0) {
                clearInterval(interval);
                resolve(slotElement.textContent);
            }
        }, 100); 
    });
}

// Handle spin button
spinButton.addEventListener("click", async () => {
    const stats = loadStats();

    // Check if player has enough money
    if (stats.money < 10) {
        alert("You don't have enough money to spin!");
        return;
    }

    // Deduct spin cost
    stats.money -= 10;
    saveStats(stats);
    updateStatBar(stats);

    // Spin slots
    const result1 = await spinSlot(slot1);
    const result2 = await spinSlot(slot2);
    const result3 = await spinSlot(slot3);

    // Check for win
    if (result1 === result2 && result2 === result3) {
        alert("You won $50!");
        stats.money += 50; 
        saveStats(stats);
        updateStatBar(stats);
    } else {
        alert("Better luck next time!");
    }
});

// Handle leave button
leaveButton.addEventListener("click", () => {
    window.location.href = "../casino/casino.html";
});

// Initialize the stat bar
document.addEventListener("DOMContentLoaded", () => {
    const stats = loadStats();
    updateStatBar(stats);
});
