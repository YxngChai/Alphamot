import {
  clearGame,
  buildGameGrid,
  buildKeyboard,
  generateWordToGuess,
  setupFirstLetter,
  setLangAttribute,
  setGameLanguage,
  initFirstTime,
  preventQuickTapMobileZoom,
} from "./initialization.js";
import { initInput, manageUserInput, handleInputType } from "./input.js";
import { state } from "./gameState.js";
import {
  changeLanguage,
  updateTexts,
  styleFlagLanguageOptions,
} from "./translation.js";
import { openCloseSettings, initDarkMode } from "./settings.js";
import { openCloseInstructions } from "./instructions.js";
import { setWordToGuess } from "./gameState.js";
import { AnimateToggleSettings } from "./settings.js";

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
initFirstTime();
preventQuickTapMobileZoom();

openCloseSettings();
openCloseInstructions();
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
