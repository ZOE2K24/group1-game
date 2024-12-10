// Elements
const spinButton = document.getElementById("spin");
const leaveButton = document.getElementById("leave");
const betButtons = document.querySelectorAll(".bet-button");
const numberBetInput = document.getElementById("number-bet");
const betAmountInput = document.getElementById("bet-amount"); 
const moneyElement = document.getElementById("money");
const rouletteResult = document.getElementById("roulette-result");

let selectedBet = null;

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

// Handle bet button clicks
betButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedBet = button.getAttribute("data-bet");
        rouletteResult.textContent = `Selected Bet: ${selectedBet}`;
    });
});

// Handle spin button
spinButton.addEventListener("click", () => {
    const stats = loadStats();

    // Validate bet
    if (!selectedBet && !numberBetInput.value) {
        alert("Please select a bet or enter a number to bet on.");
        return;
    }

    const betAmount = parseInt(betAmountInput.value); 
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    if (betAmount > stats.money) {
        alert("You don't have enough money to place this bet.");
        return;
    }

    // Deduct bet amount
    stats.money -= betAmount;
    saveStats(stats);
    updateStatBar(stats);

    // Spin the wheel
    const wheelNumbers = Array.from({ length: 37 }, (_, i) => i); // 0-36
    const result = wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)];
    rouletteResult.textContent = `Wheel Result: ${result}`;

    // Determine win/loss
    let won = false;
    let winnings = 0;

    if (selectedBet === "red" && result % 2 === 1 && result !== 0) {
        // Red wins (odd numbers except 0)
        won = true;
        winnings = betAmount * 2;
    } else if (selectedBet === "black" && result % 2 === 0 && result !== 0) {
        // Black wins (even numbers except 0)
        won = true;
        winnings = betAmount * 2;
    } else if (selectedBet === "odd" && result % 2 === 1) {
        // Odd wins
        won = true;
        winnings = betAmount * 2;
    } else if (selectedBet === "even" && result % 2 === 0 && result !== 0) {
        // Even wins
        won = true;
        winnings = betAmount * 2;
    } else if (selectedBet === "zero" && result === 0) {
        // Zero wins
        won = true;
        winnings = betAmount * 36;
    } else if (!isNaN(parseInt(selectedBet)) && parseInt(selectedBet) === result) {
        // Exact number bet wins
        won = true;
        winnings = betAmount * 35;
    }

    // Update outcome
    if (won) {
        stats.money += winnings;
        rouletteResult.textContent += ` - You won $${winnings}!`;
    } else {
        rouletteResult.textContent += " - You lost! Better luck next time.";
    }

    // Save updated stats
    saveStats(stats);
    updateStatBar(stats);
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

