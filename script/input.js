import { processWord } from "./guessManipulation.js";
import { playGame } from "./main.js";
import { verifyWord, clearGame } from "./initialization.js";
import {
  getWordToGuess,
  resetState,
  state,
  saveGame,
  clearSave,
} from "./gameState.js";
import { updateTexts } from "./translation.js";
import { SoundManager } from "./sound.js";
import {
  stats,
  generateChart,
  updateStatsText,
  saveStats,
} from "./gameStatistics.js";
import { shareGame } from "./share.js";

let rows;
let currentRow;

export function manageUserInput(key) {
  if (state.gameOver) return;

  const isLetter = /^[a-zA-Z\-]$/.test(key);
  if (isLetter) {
    enterALetter(key);
  } else if (key === "Backspace") {
    backspaceInput();
  } else if (key === "Enter") {
    handleEnter();
  }
}

export function handleInputType() {
  // Mouse input
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".keyboard-key");
    if (!button) return;
    let key = button.dataset.key;
    manageUserInput(key);
  });

  // Keyboard input
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" || event.key === "Enter") {
      event.preventDefault();
    }
    let key = event.key;
    manageUserInput(key);
  });
}

export function initInput() {
  rows = document.querySelectorAll(".gridRow");
  state.rowCounter = 0;
  // Select all the cells from current row
  currentRow = [...rows[state.rowCounter].children];
  state.currentPlacement = 1;
}

function initCorrectPositions() {
  state.correctPositions = Array(getWordToGuess().length).fill(null);
}

//Collect list at each turn, compare list and returns unique items
export function sortUsedLetters(wrongLetters, misplaced, correct) {
  state.gameState.wrongLetters = [
    ...new Set([...state.gameState.wrongLetters, ...wrongLetters]),
  ];

  state.gameState.misplaced = [
    ...new Set([...state.gameState.misplaced, ...misplaced]),
  ];

  state.gameState.correct = [
    ...new Set([...state.gameState.correct, ...correct]),
  ];
}

// add selecter letters to the screen
export function enterALetter(key) {
  if (!state.correctPositions) {
    initCorrectPositions();
  }
  if (state.currentPlacement < currentRow.length) {
    currentRow[state.currentPlacement].classList.remove("fade");
    currentRow[state.currentPlacement].textContent = key.toUpperCase();
    // SoundManager.play("entry");

    state.currentPlacement++;
  }
  return state.currentPlacement;
}
// Update screen when user use backspace
export function backspaceInput() {
  if (state.currentPlacement > 1) {
    SoundManager.play("backspace");
    state.currentPlacement--;
    const cell = currentRow[state.currentPlacement];
    if (state.correctPositions[state.currentPlacement] !== null) {
      cell.textContent = state.correctPositions[state.currentPlacement];
      cell.classList.add("fade");
    } else {
      cell.textContent = "";
    }
  }
}

// Take all letters input and make into a string
function buildUserGuess() {
  let guess = "";
  currentRow.forEach((letter) => {
    guess += letter.textContent;
  });
  return guess;
}
// Check if Guess is right asnwer
export function checkWin(userGuess, wordToGuess) {
  return userGuess === wordToGuess;
}
// Change user input to line below
export function updateLineColor(position) {
  for (let i = 0; i < getWordToGuess().length; i++) {
    if (position[i] !== "") {
      rows[state.rowCounter].children[i].classList.add(position[i]);
    }
  }
}

export function rememberCorrectPosition(userGuess) {
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === getWordToGuess()[i]) {
      state.correctPositions[i] = getWordToGuess()[i];
    }
  }
}
// Add and style orrect letters to next row, first letter is always valid.
function updateSoftLockedCell() {
  state.currentPlacement = 1;
  currentRow = [...rows[state.rowCounter].children];
  for (let i = 0; i < getWordToGuess().length; i++) {
    if (state.correctPositions[i] !== null) {
      currentRow[i].textContent = state.correctPositions[i];
      currentRow[i].classList.add("fade");
    }
  }
  currentRow[0].classList.remove("fade");
}

function hideKeyboard() {
  const keyboard = document.querySelector(".keyboard");
  keyboard.classList.add("hidden");
}
function showAnswer() {
  const endGame = document.querySelector(".endGame");
  let message = document.createElement("div");
  message.classList.add("definition");
  // message.setAttribute("data-i18n", "correctAnswer");
  const word = getWordToGuess();
  const definition = state.wordPool[word.toLowerCase()];

  message.innerText = `${word}: ${definition}`;
  // message.dataset.definition = function to get definition;
  endGame.appendChild(message);
  updateTexts();
}

export function restartTheGame() {
  const endGame = document.querySelector(".endGame");
  let message = document.createElement("div");
  message.classList.add("restart");
  message.innerHTML = `<p data-i18n="replay"></p>
  <i class="fa-solid fa-arrow-rotate-left replay-arrow"></i>`;
  endGame.appendChild(message);
  message.addEventListener("click", () => {
    SoundManager.play("restart");
    resetState();
    clearGame();
    playGame();
  });

  updateTexts();
}

export function generateShareBtn() {
  const endGame = document.querySelector(".endGame");
  let shareBtn = document.createElement("button");
  shareBtn.classList.add("alphamot-share-button");
  shareBtn.innerHTML = `<span data-i18n="share"></span><span><svg class="share-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path  d="M342.6 73.4C330.1 60.9 309.8 60.9 297.3 73.4L169.3 201.4C156.8 213.9 156.8 234.2 169.3 246.7C181.8 259.2 202.1 259.2 214.6 246.7L288 173.3L288 384C288 401.7 302.3 416 320 416C337.7 416 352 401.7 352 384L352 173.3L425.4 246.7C437.9 259.2 458.2 259.2 470.7 246.7C483.2 234.2 483.2 213.9 470.7 201.4L342.7 73.4zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 480C96 533 139 576 192 576L448 576C501 576 544 533 544 480L544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480C480 497.7 465.7 512 448 512L192 512C174.3 512 160 497.7 160 480L160 416z"/></svg></span>`;
  endGame.appendChild(shareBtn);
  shareBtn.addEventListener("click", () => {
    SoundManager.play("menu");
    shareGame();
  });

  updateTexts();
}

function handleLoss() {
  stats.totalPlayed++;
  stats.guessDistribution.lost++;
  stats.currentStreak = 0;
  saveStats();
  generateChart();
  updateStatsText();
  state.gameOver = true;
  SoundManager.play("loss");
  hideKeyboard();
  showAnswer();
  restartTheGame();
  generateShareBtn();
  localStorage.removeItem("alphamot-save");
}
export function handleWin() {
  stats.totalPlayed++;
  stats.win++;
  stats.currentStreak++;
  if (stats.currentStreak > stats.maxStreak) {
    stats.maxStreak = stats.currentStreak;
  }
  stats.guessDistribution[state.tries + 1]++;
  saveStats();
  generateChart();
  updateStatsText();
  state.gameOver = true;
  SoundManager.play("win");
  throwConfetti();
  hideKeyboard();
  showAnswer();
  restartTheGame();
  generateShareBtn();
  localStorage.removeItem("alphamot-save");
}

export function changeLineDown() {
  state.tries++;

  if (state.tries === 6) {
    handleLoss();
  } else {
    if (!state.isRestoring) {
      SoundManager.play("nextrow");
    }
    for (let child of rows[state.rowCounter + 1].children) {
      child.classList.remove("upcomingRow");
      child.classList.add("currentRow");
    }
    for (let child of rows[state.rowCounter].children) {
      child.classList.remove("currentRow");
    }
    state.rowCounter++;
    updateSoftLockedCell();
  }
}

export function updateKeyboard(wrongLetters, misplaced, correct) {
  const keys = document.querySelectorAll(".keyboard-key");
  keys.forEach((key) => {
    if (correct.includes(key.dataset.key)) {
      key.classList.remove("misplaced");
      key.classList.add("correct");
    } else if (misplaced.includes(key.dataset.key)) {
      key.classList.add("misplaced");
    } else if (wrongLetters.includes(key.dataset.key)) {
      key.classList.add("wrong");
    }
  });
}
//Confetti effect

function throwConfetti() {
  try {
    const canvas = document.querySelector(".js-confetti");
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({ confettiNumber: 1000 });
  } catch (error) {
    console.warn("Confetti error:", error);
  }
}

// Function to validate the word by pressing enter
export async function handleEnter() {
  try {
    if (state.gameOver) return;
    state.userGuess = buildUserGuess();

    const isValid = verifyWord(state.userGuess);

    if (state.gameOver) return;
    if (!isValid) {
      rows[state.rowCounter].classList.add("shake");
      SoundManager.play("error");
      setTimeout(() => rows[state.rowCounter].classList.remove("shake"), 300);
      return;
    }

    if (state.userGuess.length === getWordToGuess().length) {
      const { wrongLetters, misplaced, correct, position } = processWord(
        state.userGuess,
      );
      state.guesses.push(state.userGuess);
      saveGame();
      sortUsedLetters(wrongLetters, misplaced, correct);
      updateKeyboard(
        state.gameState.wrongLetters,
        state.gameState.misplaced,
        state.gameState.correct,
      );
      rememberCorrectPosition(state.userGuess);
      updateLineColor(position);
      if (checkWin(state.userGuess, getWordToGuess())) {
        handleWin();
      } else {
        changeLineDown();
        console.log(state.tries);
      }
    }
  } catch (error) {
    console.error("error during word validation", error);
  }
}
