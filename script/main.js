import { buildGameGrid } from "./initialization.js";
import {
  enterALetter,
  backspaceInput,
  handleEnter,
  initInput,
} from "./input.js";
import { openCloseSettings } from "./settings.js";

openCloseSettings();
buildGameGrid();
initInput();

function manageUserInput(key) {
  const isLetter = /^[a-zA-Z\-]$/.test(key);
  if (isLetter) {
    enterALetter(key);
  } else if (key === "Backspace") {
    backspaceInput();
  } else if (key === "Enter") {
    handleEnter();
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
