let attributes = {
  charm: 9,
  strength: 6,
  intelligence: 1,
  extraPts: 4,
};

function increase(attribute) {
  if (attributes.extraPts > 0 && attributes[attribute] < 10) {
      attributes[attribute]++;
      attributes.extraPts--;
      updateUI();
  }
}

function decrease(attribute) {
  if (attributes[attribute] > 0) {
      attributes[attribute]--;
      attributes.extraPts++;
      updateUI();
  }
}

function rollAgain() {
  if (attributes.extraPts > 0) {
      const roll = Math.floor(Math.random() * 3);
      const keys = ["charm", "strength", "intelligence"];
      const key = keys[roll];

      if (attributes[key] < 10) {
          attributes[key]++;
          attributes.extraPts--;
      }
      updateUI();
  }
}

function done() {
  const name = document.getElementById("name").value;
  const initialHP = 100;
  const initialMoney = 100;

  localStorage.setItem("characterName", name);
  localStorage.setItem("HP", initialHP);
  localStorage.setItem("money", initialMoney);

  alert(
      `Character Created:\nName: ${name}\nCharm: ${attributes.charm}\nStrength: ${attributes.strength}\nIntelligence: ${attributes.intelligence}\nHP: ${initialHP}\nMoney: ${initialMoney}`
  );

  window.location.href = "map.html";
}

function updateUI() {
  document.getElementById("charm").textContent = attributes.charm;
  document.getElementById("strength").textContent = attributes.strength;
  document.getElementById("intelligence").textContent = attributes.intelligence;
  document.getElementById("extraPts").textContent = attributes.extraPts;
}

updateUI();
