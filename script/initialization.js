import { keyboards } from "./keyboardLayout.js";
import { state } from "./gameState.js";
import {
  brazilianWordsToGuess,
  englishWordsToGuess,
  frenchWordsToGuess,
} from "./wordLists.js";

export function setLangAttribute() {
  const supported = ["fr", "en", "pt-BR"];
  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = navigator.language || "en";
    if (lang.startsWith("fr")) lang = "fr";
    else if (lang.startsWith("pt")) lang = "pt-BR";
    else lang = "en";
  }
  if (!supported.includes(lang)) lang = "en";
  document.documentElement.lang = lang;
  state.language = lang;
}

export function setGameLanguage() {
  if (state.language === "fr") {
    state.verificationSet = frenchWordSet;
    state.wordPool = frenchWordsToGuess;
    state.keyboard = "azerty";
  } else if (state.language === "pt-BR") {
    state.verificationSet = portugueseWordSet;
    state.wordPool = brazilianWordsToGuess;
    state.keyboard = "qwertyBR";
  } else {
    state.verificationSet = englishWordSet;
    state.wordPool = englishWordsToGuess;
    state.keyboard = "qwerty";
  }
}

// Create one set of english and on french words that are valid to check against userGuess
const englishWords = await fetch("./englishDictionary.json").then((res) =>
  res.json(),
);
export const englishWordSet = new Set(
  Object.keys(englishWords).map((w) => w.toLowerCase()),
);

const frenchWords = await fetch("./frenchDictionary.txt").then((res) =>
  res.text(),
);
export const frenchWordSet = new Set(
  frenchWords
    .split(/\r?\n/)
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean),
);
const portugueseWords = await fetch("./portugueseDictionary.txt").then((res) =>
  res.text(),
);
export const portugueseWordSet = new Set(
  portugueseWords
    .split(/\r?\n/)
    .map((w) =>
      w
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    )
    .filter(Boolean),
);

export function verifyWord(userGuess) {
  const guessWordToVerify = userGuess.toLowerCase();
  return state.verificationSet.has(guessWordToVerify);
}

// Not emplemented yet
async function getDefinition(wordToGuess) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/apple`,
  );
  if (!response.ok) {
    return false;
  }
  const dictionaryApi = await response.json();
  const definition =
    dictionaryApi[0]?.meanings[0]?.definitions[0]?.definition ??
    "No definition found";
  return definition;
}

// export async function handleGuess(userGuess) {
//   const result = await verifyWord(userGuess);
//   return result;
// }

export function generateWordToGuess(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

export function setupFirstLetter(wordToGuess) {
  const firstRow = document.querySelectorAll(".currentRow");
  firstRow[0].textContent = wordToGuess[0];
}

export function clearGame() {
  const app = document.querySelector(".app");
  app.innerHTML = "";
  const gameArea = document.createElement("div");
  gameArea.classList.add("gameArea");
  const gameGrid = document.createElement("div");
  gameGrid.classList.add("gameGrid");
  gameArea.appendChild(gameGrid);
  app.appendChild(gameArea);
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  app.appendChild(keyboard);
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
        cell.innerHTML = `<i class="fas fa-backspace"></i>`;
      } else {
        cell.textContent = key;
      }

      cell.classList.add("keyboard-key");
      if (key === "Enter" || key === "Valider") {
        cell.dataset.key = "Enter";
        cell.classList.add("enter");
      } else {
        cell.dataset.key = key;
      }
      keyboardRow.appendChild(cell);
    });
    keyboard.appendChild(keyboardRow);
  });
}
