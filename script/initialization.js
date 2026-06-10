import { keyboards } from "./keyboardLayout.js";
import { state } from "./gameState.js";
import {
  brazilianWordsToGuess,
  englishWordsToGuess,
  frenchWordsToGuess,
} from "./wordLists.js";
import { translations, updateTexts } from "./translation.js";

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
let englishWordSet = new Set();
try {
  const response = await fetch(`./data/dictionaries/englishDictionary.json`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const englishWords = await response.json();
  englishWordSet = new Set(
    Object.keys(englishWords).map((w) => w.toLowerCase()),
  );
} catch (error) {
  console.error("Failed to load English dictionary:", error);
  englishWordSet = new Set();
}

let frenchWordSet = new Set();
try {
  const response = await fetch(`./data/dictionaries/frenchDictionary.txt`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const frenchWords = await response.text();
  frenchWordSet = new Set(
    frenchWords
      .split(/\r?\n/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean),
  );
} catch (error) {
  console.error("Failed to load French dictionary:", error);
  frenchWordSet = new Set();
}

let portugueseWordSet = new Set();
try {
  const response = await fetch(`./data/dictionaries/portugueseDictionary.txt`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const portugueseWords = await response.text();
  portugueseWordSet = new Set(
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
} catch (error) {
  console.error("Failed to load Portuguese dictionary:", error);
  portugueseWordSet = new Set();
}

export function verifyWord(userGuess) {
  const guessWordToVerify = userGuess.toLowerCase();
  return state.verificationSet.has(guessWordToVerify);
}

// Not emplemented yet
export async function getDefinition(wordToGuess) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToGuess}`,
    );
    if (!response.ok) {
      return false;
    }
    const dictionaryApi = await response.json();
    console.log(dictionaryApi);
    const definition =
      dictionaryApi[0]?.meanings[0]?.definitions[0]?.definition ??
      "No definition found";
    console.log(definition);
    return definition;
  } catch (error) {
    console.error("Error loading the definition:", error);
  }
}

// not used yet
// async function getDefinition(wordToGuess) {
//   const response = await fetch(
//     `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToGuess}`,
//   );
//   if (!response.ok) {
//     return false;
//   }
//   const dictionaryApi = await response.json();
//   console.log(dictionaryApi);
//   const definition =
//     dictionaryApi[0]?.meanings[0]?.definitions[0]?.definition ??
//     "No definition found";
//   console.log(definition);
//   return definition;
// }

// export async function handleGuess(userGuess) {
//   const result = await verifyWord(userGuess);
//   return result;
// }

export function generateWordToGuess(wordList) {
  const keys = Object.keys(wordList);
  return keys[Math.floor(Math.random() * keys.length)].toUpperCase();
}

export function setupFirstLetter(wordToGuess) {
  const firstRow = document.querySelectorAll(".currentRow");
  firstRow[0].textContent = wordToGuess[0];
}

export function clearGame() {
  const app = document.querySelector(".app");
  app.innerHTML = "";
  const endGame = document.querySelector(".endGame");
  endGame.innerHTML = "";
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
  const keyboardTop = document.createElement("div");
  keyboardTop.classList.add("keyboardTop");

  const languageName = document.createElement("span");
  languageName.classList.add("keyboardLanguage");
  languageName.textContent = translations[state.language]["keyboardLg"];
  keyboardTop.appendChild(languageName);

  const home = document.createElement("span");
  home.innerHTML = `<button class="go-home"><svg  class="home-keyboard-btn go-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path class="go-home" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg></button>`;
  keyboardTop.appendChild(home);

  keyboard.appendChild(keyboardTop);
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

export function initFirstTime() {
  const alreadyVisited = localStorage.getItem("alreadyVisited");
  if (!alreadyVisited) {
    const instructions = document.querySelector(".instructions");
    instructions.classList.add("opened");
    localStorage.setItem("alreadyVisited", "true");
  }
}

export function preventQuickTapMobileZoom() {
  document.addEventListener(
    "touchend",
    function (event) {
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300;

      if (this.lastTouchEnd && now - this.lastTouchEnd <= DOUBLE_TAP_DELAY) {
        event.preventDefault();
      }
      this.lastTouchEnd = now;
    },
    { passive: false },
  );
}

export function renderHomePage() {
  const home = document.querySelector(".app");
  home.innerHTML = "";
  home.innerHTML = `
     <div class="home">
        <h2 class="home-logo">
          <span>A</span>
          <span>L</span>
          <span>P</span>
          <span>H</span>
          <span>A</span>
          <span>M</span>
          <span>O</span>
          <span>T</span>
        </h2>
        <div class="home-buttons">
        <button data-i18n="play" class="home-button launch-game"></button>
        <button data-i18n="instructionsTitle" class="home-button open-help"></button>
        <button data-i18n="changeLG" class="home-button open-settings"></button>
        </div>
        </div>
  `;
}
export function returnHome() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".go-home")) {
      renderHomePage();
      updateTexts();
    }
  });
}
