import { buildGameGrid, buildKeyboard } from "./initialization.js";
import {
  enterALetter,
  backspaceInput,
  handleEnter,
  initInput,
} from "./input.js";
import { openCloseSettings } from "./settings.js";

openCloseSettings();
buildGameGrid();
buildKeyboard("qwerty");
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
