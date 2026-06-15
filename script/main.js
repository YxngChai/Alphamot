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
import { initSound, SoundManager } from "./sound.js";
import { restoreGame } from "./restoreGame.js";
import { stats } from "./gameStatistics.js";

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

  console.log(stats);
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
    SoundManager.play("restart");
    const saved = loadGame();
    if (saved) {
      restoreGame(saved);
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
