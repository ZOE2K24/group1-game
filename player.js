let attributes = {
  charm: 0,
  strength: 0,
  intelligence: 0,
  extraPts: 10, 
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
  attributes.charm = 0;
  attributes.strength = 0;
  attributes.intelligence = 0;
  attributes.extraPts = 10;

  // to distribute all points randomly
  while (attributes.extraPts > 0) {
    const roll = Math.floor(Math.random() * 3);
    const keys = ["charm", "strength", "intelligence"];
    const key = keys[roll];

    if (attributes[key] < 10) {
      attributes[key]++;
      attributes.extraPts--;
    }
  }
  updateUI();
}

function done() {
  const name = document.getElementById("name").value.trim() || "Anonymous";
  const initialHP = 100;
  const initialMoney = 100;

  // Save character attributes and stats to localStorage
  localStorage.setItem("characterName", name);
  localStorage.setItem("HP", initialHP);
  localStorage.setItem("money", initialMoney);
  localStorage.setItem("charm", attributes.charm);
  localStorage.setItem("strength", attributes.strength);
  localStorage.setItem("intelligence", attributes.intelligence);

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
