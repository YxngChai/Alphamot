// Select all the box from current row
const currentRow = document.querySelectorAll(".currentRow");

// decide the column case where next input  will go
let currentPlacement = 1;

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

// Function to validate the word by pressing enter
export function handleEnter(wordToGuess) {
  const userGuess = buildUserGuess();
  if (userGuess.length === wordToGuess.length) {
    if (checkWin(userGuess, wordToGuess)) {
      console.log("You Win!");
    } else {
      console.log("Wrong Answer!");
    }
  }
}
