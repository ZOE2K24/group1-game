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

// Update stat-bar 
function updateStatBar(stats) {
    document.querySelector(".hp-progress").style.width = `${(stats.hp / 100) * 100}%`;
    document.getElementById("money").textContent = `Money: $${stats.money}`;
    document.getElementById("actions-left").textContent = `Actions Left: ${stats.actions}`;
    document.getElementById("day").textContent = `Day: ${stats.day}`;
}

// Update bank page stats
function updateBankStats(stats) {
    document.getElementById("bank-balance").textContent = stats.bank;
    document.getElementById("cash").textContent = stats.money;
}

// Function to apply interest to the bank balance
function applyInterest(stats) {
    const interestRate = 0.03; 
    stats.bank = Math.floor(stats.bank * (1 + interestRate)); 
    saveStats(stats); 
}


// Handle deposit
document.getElementById("deposit").addEventListener("click", () => {
    const amount = parseInt(document.getElementById("amount").value, 10);
    if (amount > 0 && amount <= stats.money) {
        stats.money -= amount;
        stats.bank += amount;
        saveStats(stats); 
        updateBankStats(stats); 
        updateStatBar(stats); 
        alert(`Deposited $${amount} to the bank.`);
    } else {
        alert("Invalid deposit amount.");
    }
});

// Handle withdraw
document.getElementById("withdraw").addEventListener("click", () => {
    const amount = parseInt(document.getElementById("amount").value, 10);
    if (amount > 0 && amount <= stats.bank) {
        stats.money += amount;
        stats.bank -= amount;
        saveStats(stats); 
        updateBankStats(stats); 
        updateStatBar(stats); 
        alert(`Withdrew $${amount} from the bank.`);
    } else {
        alert("Invalid withdrawal amount.");
    }
});

// Update bank page stats
function updateBankStats(stats) {
    document.getElementById("bank-balance").textContent = stats.bank;
    document.getElementById("cash").textContent = stats.money;
}


// Handle leave button
document.getElementById("leave").addEventListener("click", () => {
    const safePosition = { x: 50, y: 50 }; 
    localStorage.setItem("characterX", safePosition.x);
    localStorage.setItem("characterY", safePosition.y);

    // Redirect back to the map
    window.location.href = "../map.html";
});

// Initialize page
const stats = loadStats();
updateStatBar(stats);
updateBankStats(stats);
