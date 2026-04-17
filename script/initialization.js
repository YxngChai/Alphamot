import { keyboards } from "./keyboardLayout.js";

// const response = await fetch(
//   `https://api.dictionaryapi.dev/api/v2/entries/en/BANANA`,
// );
// export const dictionaryapi = response.json();

async function verifyWord(userGuess) {
  const guessWordToVerify = userGuess.toLowerCase();
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${guessWordToVerify}`,
  );
  if (!response.ok) {
    return false;
  }
  const dictionaryApi = await response.json();
  return dictionaryApi;
}

export async function handleGuess(userGuess) {
  const result = await verifyWord(userGuess);
  return result;
}

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
const words = [
  "banana",
  "orange",
  "tomato",
  "pardon",
  "cherry",
  "purple",
  "silver",
  "circle",
  "animal",
  "guitar",
  "planet",
  "socket",
  "stream",
  "button",
  "forest",
  "castle",
  "bridge",
  "pencil",
  "planet",
  "coffee",
  "street",
  "market",
  "school",
  "bottle",
  "window",
  "family",
  "monkey",
  "rabbit",
  "turtle",
  "donkey",
  "beacon",
  "spring",
  "bright",
  "travel",
  "health",
  "summer",
];

export let wordToGuess =
  words[Math.floor(Math.random() * words.length)].toUpperCase();

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

  keyboardLayout.forEach((row, i) => {
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboardRow");

    row.forEach((key, y) => {
      let cell = document.createElement("div");
      if (key === "Backspace") {
        cell.innerHTML = `<i class="far fa-backspace"></i>`;
      } else {
        cell.textContent = key;
      }

      cell.classList.add("keyboard-key");
      cell.dataset.key = key;
      keyboardRow.appendChild(cell);
    });
    keyboard.appendChild(keyboardRow);
  });

  const validateBtn = document.createElement("button");
  validateBtn.classList.add("keyboard-key", "valider");
  validateBtn.dataset.key = "Enter";
  validateBtn.textContent = "Valider";
  keyboard.appendChild(validateBtn);
}
