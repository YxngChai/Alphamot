import { wordToGuess } from "./initialization.js";
import { processWord } from "./guessManipulation.js";
import { playGame } from "./main.js";
import { handleGuess } from "./initialization.js";

// decide the column case where next input  will go
let currentPlacement = 1;
// To change line down when validating a word
let rows;
let rowCounter = 0;
let currentRow;

let userGuess = "";
let tries = 0;

// will save all letters from player input in different categories
let gameState = {
  wrongLetters: [],
  misplaced: [],
  correct: [],
};

let correctPositions;

export function manageUserInput(key) {
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
    let key = event.key;
    manageUserInput(key);
  });
}

export function initInput() {
  rows = document.querySelectorAll(".gridRow");
  rowCounter = 0;
  // Select all the cells from current row
  currentRow = [...rows[rowCounter].children];
  currentPlacement = 1;
}

function initCorrectPositions() {
  correctPositions = Array(wordToGuess.length).fill(null);
}

//Collect list at each turn, compare list and returns unique items
function sortUsedLetters(wrongLetters, misplaced, correct) {
  gameState.wrongLetters = [
    ...new Set([...gameState.wrongLetters, ...wrongLetters]),
  ];

  gameState.misplaced = [...new Set([...gameState.misplaced, ...misplaced])];

  gameState.correct = [...new Set([...gameState.correct, ...correct])];
}

// add selecter letters to the screen
export function enterALetter(key) {
  if (!correctPositions) {
    initCorrectPositions();
  }
  if (currentPlacement < currentRow.length) {
    currentRow[currentPlacement].classList.remove("fade");
    currentRow[currentPlacement].textContent = key.toUpperCase();

    currentPlacement++;
  }
  return currentPlacement;
}
// Update screen when user use backspace
export function backspaceInput() {
  if (currentPlacement > 1) {
    currentPlacement--;
    const cell = currentRow[currentPlacement];
    if (correctPositions[currentPlacement] !== null) {
      cell.textContent = correctPositions[currentPlacement];
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
  for (let i = 0; i < wordToGuess.length; i++) {
    if (position[i] !== "") {
      rows[rowCounter].children[i].classList.add(position[i]);
    }
  }
}

function rememberCorrectPosition(userGuess) {
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === wordToGuess[i]) {
      correctPositions[i] = userGuess[i];
    }
  }
}
// Add and style orrect letters to next row, first letter is always valid.
function updateSoftLockedCell() {
  currentPlacement = 1;
  currentRow = [...rows[rowCounter].children];
  for (let i = 0; i < wordToGuess.length; i++) {
    if (correctPositions[i] !== null) {
      currentRow[i].textContent = correctPositions[i];
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
  const keyboard = document.querySelector(".keyboard");
  let message = document.createElement("div");
  message.classList.add("lossAnswer");
  message.textContent = `Correct Answer: ${wordToGuess}`;
  keyboard.after(message);
}
function resetState() {
  currentPlacement = 1;
  correctPositions = [];
  rowCounter = 0;
  tries = 0;
  userGuess = "";
  gameState = {
    wrongLetters: [],
    misplaced: [],
    correct: [],
  };
}
export function clearGame() {
  const app = document.querySelector(".app");
  app.innerHTML = "";
  const gameGrid = document.createElement("div");
  gameGrid.classList.add("gameGrid");
  app.appendChild(gameGrid);
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  app.appendChild(keyboard);
}

function restartTheGame() {
  const app = document.querySelector(".app");
  let message = document.createElement("div");
  message.classList.add("restart");
  message.innerHTML = `<p>Play Again   </p>
  <i class="fa-solid fa-arrow-rotate-left"></i>`;

  message.addEventListener("click", () => {
    resetState();
    clearGame();
    playGame();
  });
  app.appendChild(message);
}

function handleLoss() {
  hideKeyboard();
  resetState();
  showAnswer();
  restartTheGame();
}
function handleWin() {
  throwConfetti();
  resetState();
  hideKeyboard();
  restartTheGame();
}

function changeLineDown() {
  tries++;
  if (tries === 6) {
    console.log("You lost!");
    handleLoss();
  } else {
    console.log("Wrong Answer!");
    for (let child of rows[rowCounter + 1].children) {
      child.classList.remove("upcomingRow");
      child.classList.add("currentRow");
    }
    for (let child of rows[rowCounter].children) {
      child.classList.remove("currentRow");
    }
    rowCounter++;
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
  const canvas = document.querySelector(".js-confetti");
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({ confettiNumber: 1000 });
}

// Function to validate the word by pressing enter
export async function handleEnter() {
  userGuess = buildUserGuess();

  const isValid = await handleGuess(userGuess);

  if (!isValid) {
    rows[rowCounter].classList.add("shake");
    setTimeout(() => rows[rowCounter].classList.remove("shake"), 300);
    return;
  }

  if (userGuess.length === wordToGuess.length) {
    tries;
    const { wrongLetters, misplaced, correct, position } =
      processWord(userGuess);
    // updateKeyboard(wrongLetters, misplaced, correct);
    sortUsedLetters(wrongLetters, misplaced, correct);
    updateKeyboard(
      gameState.wrongLetters,
      gameState.misplaced,
      gameState.correct,
    );
    rememberCorrectPosition(userGuess);

    updateLineColor(position);
    if (checkWin(userGuess, wordToGuess)) {
      console.log(correctPositions);
      handleWin();
    } else {
      changeLineDown();
    }
  }
}
