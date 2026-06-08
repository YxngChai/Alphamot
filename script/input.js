import { processWord } from "./guessManipulation.js";
import { playGame } from "./main.js";
import { verifyWord, clearGame } from "./initialization.js";
import { getWordToGuess, resetState, state } from "./gameState.js";
import { updateTexts } from "./translation.js";
import { SoundManager } from "./sound.js";

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
function sortUsedLetters(wrongLetters, misplaced, correct) {
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
function checkWin(userGuess, wordToGuess) {
  return userGuess === wordToGuess;
}
// Change user input to line below
function updateLineColor(position) {
  for (let i = 0; i < getWordToGuess().length; i++) {
    if (position[i] !== "") {
      rows[state.rowCounter].children[i].classList.add(position[i]);
    }
  }
}

function rememberCorrectPosition(userGuess) {
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

function handleLoss() {
  state.gameOver = true;
  SoundManager.play("loss");
  hideKeyboard();
  showAnswer();
  restartTheGame();
}
function handleWin() {
  state.gameOver = true;
  SoundManager.play("win");
  throwConfetti();
  hideKeyboard();
  showAnswer();
  restartTheGame();
}

function changeLineDown() {
  state.tries++;
  if (state.tries === 6) {
    handleLoss();
  } else {
    SoundManager.play("nextrow");
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

function updateKeyboard(wrongLetters, misplaced, correct) {
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
      // updateKeyboard(wrongLetters, misplaced, correct);
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
      }
    }
  } catch (error) {
    console.error("error during word validation", error);
  }
}
