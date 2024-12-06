// Elements
const rollButton = document.getElementById("roll");
const leaveButton = document.getElementById("leave");
const colorButtons = document.querySelectorAll(".color-button");
const diceElements = document.querySelectorAll(".dice");
const gameResult = document.getElementById("game-result");
const moneyElement = document.getElementById("money");

let selectedColor = null;

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
    moneyElement.textContent = `Money: $${stats.money}`;
}

// Handle color button clicks
colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedColor = button.getAttribute("data-color");
        gameResult.textContent = `You bet on: ${selectedColor.toUpperCase()}`;
    });
});

// Handle roll button
rollButton.addEventListener("click", () => {
    const stats = loadStats();

    // Validate bet
    if (!selectedColor) {
        alert("Please select a color to bet on.");
        return;
    }

    if (stats.money < 10) {
        alert("You don't have enough money to play!");
        return;
    }

    // Deduct bet amount
    stats.money -= 10;
    saveStats(stats);
    updateStatBar(stats);

    // Generate random dice colors
    const colors = ["red", "green", "blue", "yellow"];
    const diceResults = Array.from({ length: 3 }, () =>
        colors[Math.floor(Math.random() * colors.length)]
    );

    // Display dice results
    diceResults.forEach((color, index) => {
        diceElements[index].style.background = color;
        diceElements[index].textContent = ""; // Clear dice text
    });

    // Check if player wins
    const wins = diceResults.filter((color) => color === selectedColor).length;

    if (wins > 0) {
        const winnings = wins * 20; // $20 per matching dice
        stats.money += winnings;
        gameResult.textContent = `You won $${winnings}!`;
    } else {
        gameResult.textContent = "You lost! Better luck next time.";
    }

    // Save updated stats
    saveStats(stats);
    updateStatBar(stats);
});

// Handle leave button
leaveButton.addEventListener("click", () => {
    window.location.href = "../casino/casino.html";
});

// Initialize stat bar
document.addEventListener("DOMContentLoaded", () => {
    const stats = loadStats();
    updateStatBar(stats);
});
