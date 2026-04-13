import { wordToGuess } from "./main.js";
import { processWord } from "./word-config.js";

// decide the column case where next input  will go
let currentPlacement = 1;

// To change line down when validating a word
const rows = document.querySelectorAll(".gridRow");
let rowCounter = 2;

// Select all the cells from current row
let currentRow = [...rows[rowCounter - 1].children];

let userGuess = "";
let tries = 1;

// will save all letters from player input in different categories
let gameState = {
  wrongLetters: [],
  misplaced: [],
  correct: [],
};
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
  if (currentPlacement < currentRow.length) {
    currentRow[currentPlacement].textContent = key.toUpperCase();
    currentPlacement++;
  }
  return currentPlacement;
}
// Update screen when user use backspace
export function backspaceInput() {
  if (currentPlacement > 1) {
    currentPlacement--;
    currentRow[currentPlacement].textContent = "";
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

function changeLineDown() {
  tries++;
  if (tries === 6) {
    console.log("You lost!");
  } else {
    console.log("Wrong Answer!");
    for (let child of rows[rowCounter].children) {
      child.classList.remove("upcomingRow");
      child.classList.add("currentRow");
    }
    for (let child of rows[rowCounter - 1].children) {
      child.classList.remove("currentRow");
    }
    rowCounter++;
    // Reset user guess, placement and sets first letter;

    userGuess = "";
    currentPlacement = 1;
    currentRow = document.querySelectorAll(".currentRow");
    currentRow[currentPlacement - 1].textContent = wordToGuess[0];
  }
}

// Function to validate the word by pressing enter
export function handleEnter(wordToGuess) {
  userGuess = buildUserGuess();
  if (userGuess.length === wordToGuess.length) {
    if (checkWin(userGuess, wordToGuess)) {
      console.log("You Win!");
    } else {
      const { wrongLetters, misplaced, correct, position } =
        processWord(userGuess);
      sortUsedLetters(wrongLetters, misplaced, correct);
      console.log("red:");
      console.log(gameState.wrongLetters);
      console.log("Yellow:");
      console.log(gameState.misplaced);
      console.log("green:");
      console.log(gameState.correct);
      console.log("position:");
      console.log(position);

      changeLineDown();
    }
  }
}

//i need to black typping if game is lost
