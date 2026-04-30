import {
  buildGameGrid,
  buildKeyboard,
  generateWordToGuess,
  setupFirstLetter,
  setLangAttribute,
  setGameLanguage,
} from "./initialization.js";
import {
  initInput,
  manageUserInput,
  handleInputType,
  clearGame,
} from "./input.js";
import { state } from "./gameState.js";
import {
  changeLanguage,
  updateTexts,
  styleFlagLanguageOptions,
} from "./translation.js";
import { openCloseSettings, initDarkMode } from "./settings.js";
import { setWordToGuess } from "./gameState.js";
import { AnimateToggleSettings } from "./settings.js";

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

export function playGame() {
  clearGame();
  const newWord = generateWordToGuess(state.wordPool);
  console.log(newWord);
  setWordToGuess(newWord);
  buildGameGrid(newWord);
  setupFirstLetter(newWord);
  buildKeyboard(state.keyboard);
  initInput();
}

setLangAttribute();
setGameLanguage();
updateTexts();
styleFlagLanguageOptions();
changeLanguage();

openCloseSettings();
AnimateToggleSettings();

initDarkMode();

handleInputType();

playGame();

const replayBtn = document.querySelector(".restart");
if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    playGame();
  });
}
