import { enterALetter, backspaceInput, handleEnter } from "./input.js";

export let wordToGuess = "Plante".toUpperCase();
// console.log(wordToGuess);

const uiKeys = document.querySelectorAll(".keyboard-key");

// console.log(currentRow);

function manageUserInput(key) {
  const isLetter = /^[a-zA-Z\-]$/.test(key);
  if (isLetter) {
    enterALetter(key);
  } else if (key === "Backspace") {
    backspaceInput();
  } else if (key === "Enter") {
    handleEnter(wordToGuess);
  }
}

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

// *******************
