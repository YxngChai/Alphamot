import { buildGameGrid, buildKeyboard } from "./initialization.js";
import {
  initInput,
  manageUserInput,
  handleInputType,
  clearGame,
} from "./input.js";
import { openCloseSettings } from "./settings.js";

openCloseSettings();

export function playGame() {
  clearGame();
  buildGameGrid();
  buildKeyboard("qwerty");
  initInput();
}

handleInputType();

playGame();

const replayBtn = document.querySelector(".restart");
if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    playGame();
  });
}

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
