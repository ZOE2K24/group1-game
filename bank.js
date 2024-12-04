// Function to simulate playing Slots
function playSlots() {
    const moneyElement = document.getElementById('money');
    const resultElement = document.getElementById('slots-result');

    // Deduct $10 to play
    let money = parseInt(moneyElement.textContent);
    if (money < 10) {
        resultElement.textContent = "Not enough money to play slots!";
        return;
    }
    money -= 10;
    moneyElement.textContent = money;

    // Random slot results (3 symbols: 🍒, 7️⃣, ⭐)
    const symbols = ["🍒", "7️⃣", "⭐"];
    const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
    const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
    const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

    // Display the slot result
    resultElement.innerHTML = `Slots: ${slot1} | ${slot2} | ${slot3}`;

    // Check for winning conditions
    if (slot1 === slot2 && slot2 === slot3) {
        const prize = 50;
        money += prize;
        moneyElement.textContent = money;
        resultElement.innerHTML += `<br>JACKPOT! You win $${prize}!`;
    } else {
        resultElement.innerHTML += `<br>Better luck next time!`;
    }
}

// Function to simulate playing Blackjack
function playBlackjack() {
    const moneyElement = document.getElementById('money');
    const resultElement = document.getElementById('blackjack-result');

    // Deduct $20 to play
    let money = parseInt(moneyElement.textContent);
    if (money < 20) {
        resultElement.textContent = "Not enough money to play blackjack!";
        return;
    }
    money -= 20;
    moneyElement.textContent = money;

    // Random dealer and player cards
    const playerCard1 = Math.floor(Math.random() * 11) + 1;
    const playerCard2 = Math.floor(Math.random() * 11) + 1;
    const dealerCard1 = Math.floor(Math.random() * 11) + 1;
    const dealerCard2 = Math.floor(Math.random() * 11) + 1;

    const playerTotal = playerCard1 + playerCard2;
    const dealerTotal = dealerCard1 + dealerCard2;

    resultElement.innerHTML = `Your Cards: ${playerCard1} + ${playerCard2} = ${playerTotal} | Dealer's Cards: ${dealerCard1} + ${dealerCard2} = ${dealerTotal}`;

    // Check for win conditions
    if (playerTotal > 21) {
        resultElement.innerHTML += `<br>You busted! You lose $20.`;
    } else if (dealerTotal > 21) {
        resultElement.innerHTML += `<br>Dealer busted! You win $40.`;
        money += 40;
        moneyElement.textContent = money;
    } else if (playerTotal > dealerTotal) {
        resultElement.innerHTML += `<br>You win $40!`;
        money += 40;
        moneyElement.textContent = money;
    } else if (playerTotal === dealerTotal) {
        resultElement.innerHTML += `<br>It's a tie! You get your $20 back.`;
        money += 20;
        moneyElement.textContent = money;
    } else {
        resultElement.innerHTML += `<br>Dealer wins! You lose $20.`;
    }
}

// Function to simulate playing Roulette
function playRoulette() {
    const moneyElement = document.getElementById('money');
    const resultElement = document.getElementById('roulette-result');

    // Deduct $10 to play
    let money = parseInt(moneyElement.textContent);
    if (money < 10) {
        resultElement.textContent = "Not enough money to play roulette!";
        return;
    }
    money -= 10;
    moneyElement.textContent = money;

    // Roulette options: Red, Black, Odd, Even
    const betOptions = ["Red", "Black", "Odd", "Even"];
    const playerBet = betOptions[Math.floor(Math.random() * betOptions.length)];

    // Spin result (randomly generate Red, Black, Odd, Even)
    const spinResult = betOptions[Math.floor(Math.random() * betOptions.length)];

    resultElement.innerHTML = `You bet on ${playerBet} | Spin result: ${spinResult}`;

    // Check if player wins
    if (playerBet === spinResult) {
        resultElement.innerHTML += `<br>You win $20!`;
        money += 20;
        moneyElement.textContent = money;
    } else {
        resultElement.innerHTML += `<br>You lose $10.`;
    }
}

// Function to leave the casino
function leaveCasino() {
    alert("You chose to leave the casino. Come back soon!");
}
