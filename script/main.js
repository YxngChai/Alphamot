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
  renderHomePage,
  returnHome,
} from "./initialization.js";
import { initInput, manageUserInput, handleInputType } from "./input.js";
import { state, loadGame, saveGame } from "./gameState.js";
import {
  changeLanguage,
  updateTexts,
  styleFlagLanguageOptions,
} from "./translation.js";
import { openCloseSettings, initDarkMode } from "./settings.js";
import { openCloseInstructions } from "./instructions.js";
import { setWordToGuess } from "./gameState.js";
import { AnimateToggleSettings, activateSound } from "./settings.js";
import { initSound } from "./sound.js";
import { restoreGame } from "./restoreGame.js";

export function playGame() {
  clearGame();
  const newWord = generateWordToGuess(state.wordPool);
  console.log(newWord);
  setWordToGuess(newWord);
  buildGameGrid(newWord);
  setupFirstLetter(newWord);
  buildKeyboard(state.keyboard);
  initInput();
  saveGame();
}

renderHomePage();
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
returnHome();

initDarkMode();
activateSound();
initSound();

handleInputType();

document.addEventListener("click", (e) => {
  if (e.target.matches(".launch-game")) {
    const saved = loadGame();
    if (saved) {
      restoreGame(saved);
      console.log(state.tries);
    } else {
      playGame();
    }
  }
});

const replayBtn = document.querySelector(".restart");
if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    playGame();
  });
}
