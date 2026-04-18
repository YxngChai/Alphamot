import {
  buildGameGrid,
  buildKeyboard,
  generateWordToGuess,
  setupFirstLetter,
} from "./initialization.js";
import {
  initInput,
  manageUserInput,
  handleInputType,
  clearGame,
} from "./input.js";
import { openCloseSettings } from "./settings.js";
import { englishWords, mots } from "./wordLists.js";
import { setWordToGuess } from "./gameState.js";

openCloseSettings();

export function playGame() {
  clearGame();
  const newWord = generateWordToGuess(mots);
  console.log(newWord);
  setWordToGuess(newWord);
  buildGameGrid(newWord);
  setupFirstLetter(newWord);
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
