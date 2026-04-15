import { wordToGuess } from "./initialization.js";
import { processWord } from "./guessManipulation.js";

// decide the column case where next input  will go
let currentPlacement = 1;

// To change line down when validating a word
const rows = document.querySelectorAll(".gridRow");
let rowCounter = 0;

// Select all the cells from current row
let currentRow = [...rows[rowCounter].children];

let userGuess = "";
let tries = 0;

// will save all letters from player input in different categories
let gameState = {
  wrongLetters: [],
  misplaced: [],
  correct: [],
};
let correctPositions;
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

function changeLineDown() {
  tries++;
  if (tries === 6) {
    console.log("You lost!");
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
  console.log(wrongLetters);
  console.log(correct);
  console.log(misplaced);
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
export function handleEnter() {
  userGuess = buildUserGuess();
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
      console.log("You Win!");
      throwConfetti();
    } else {
      changeLineDown();
    }
  }
}
