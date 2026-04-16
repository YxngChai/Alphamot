import { keyboards } from "./keyboardLayout.js";

const mots = [
  "pardon",
  "chalet",
  "bateau",
  "fraise",
  "garage",
  "valise",
  "tomate",
  "pierre",
  "chemin",
  "plante",
  "orange",
  "maison",
  "brosse",
  "animal",
  "bureau",
  "cactus",
  "bassin",
  "ballet",
  "crayon",
  "voyage",
];

const animals = [
  "monkey",
  "rabbit",
  "turtle",
  "donkey",
  "falcon",
  "parrot",
  "beaver",
  "jaguar",
  "cougar",
  "lizard",
];

export let wordToGuess =
  animals[Math.floor(Math.random() * animals.length)].toUpperCase();

function setupFirstLetter() {
  const firstRow = document.querySelectorAll(".currentRow");
  firstRow[0].textContent = wordToGuess[0];
}

export function buildGameGrid() {
  const grid = document.querySelector(".gameGrid");
  // can be changed in futur for difficulty options
  let nbLines = 6;
  for (let i = 0; i < nbLines; i++) {
    const row = document.createElement("div");
    row.classList.add("gridRow");
    grid.appendChild(row);
  }
  const testRows = document.querySelectorAll(".gridRow");
  testRows.forEach((row, index) => {
    for (let i = 0; i < wordToGuess.length; i++) {
      const cell = document.createElement("div");
      index === 0
        ? cell.classList.add("currentRow")
        : cell.classList.add("upcomingRow");
      row.appendChild(cell);
    }
  });
  setupFirstLetter();
}

export function buildKeyboard(keyboardLanguage) {
  const keyboard = document.querySelector(".keyboard");
  const keyboardLayout = keyboards[keyboardLanguage];

  for (let i = 0; i < keyboardLayout.length; i++) {
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboardRow");
    console.log(keyboardLayout[i].length);
    for (let y = 0; y < keyboardLayout[i].length; y++) {
      let cell = document.createElement("div");
      if (keyboardLayout[i][y] === "Backspace") {
        cell.innerHTML = `<i class="far fa-backspace"></i>`;
      } else {
        cell.textContent = keyboardLayout[i][y];
      }

      cell.classList.add("keyboard-key");
      cell.dataset.key = keyboardLayout[i][y];
      keyboardRow.appendChild(cell);
    }

    keyboard.appendChild(keyboardRow);
  }
  const validateBtn = document.createElement("button");
  validateBtn.classList.add("keyboard-key", "valider");
  validateBtn.dataset.key = "Enter";
  validateBtn.textContent = "Valider";
  keyboard.appendChild(validateBtn);
}
