import { keyboards } from "./keyboardLayout.js";

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

export function generateWordToGuess(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

export function setupFirstLetter(wordToGuess) {
  const firstRow = document.querySelectorAll(".currentRow");
  firstRow[0].textContent = wordToGuess[0];
}

export function buildGameGrid(wordToGuess) {
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
