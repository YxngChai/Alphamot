import { enterALetter, backspaceInput, handleEnter } from "./input.js";

let wordToGuess = "Plante".toUpperCase();
console.log(wordToGuess);

const uiKeys = document.querySelectorAll(".keyboard-key");
const rows = document.querySelectorAll(".gridRow");

// let currentRow = rows[0];
// console.log(currentRow);

function manageUserInput(key) {
  const isLetter = /^[a-zA-Z]$/.test(key);
  if (isLetter) {
    enterALetter(key);
  } else if (key === "Backspace") {
    backspaceInput();
  } else if (key === "Enter") {
    handleEnter(wordToGuess);
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".keyboard-key");
  if (!button) return;
  let key = button.dataset.key;
  manageUserInput(key);
});

document.addEventListener("keydown", (event) => {
  let key = event.key;
  manageUserInput(key);
});

// *******************
