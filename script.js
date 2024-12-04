document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("characterName");
    const hp = localStorage.getItem("HP");
    const money = localStorage.getItem("money");

    const statsContainer = document.getElementById("character-stats");

    if (name && hp && money) {
        statsContainer.innerHTML = `
            Name: ${name} <br>
            HP: ${hp} <br>
            Money: $${money}
        `;
    } else {
        statsContainer.innerHTML = `<p>No character data found. Start a new game!</p>`;
    }
});


function resetCharacter() {
    const confirmation = confirm("Are you sure you want to reset your character? This will erase all progress.");
    if (confirmation) {
        localStorage.clear(); 
        alert("Character has been reset!");
        window.location.href = "newplayer.html"; 
    }
}
