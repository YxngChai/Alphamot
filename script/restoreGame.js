import { state, setWordToGuess } from "./gameState.js";

import {
  clearGame,
  buildGameGrid,
  buildKeyboard,
  setupFirstLetter,
} from "./initialization.js";

import {
  initInput,
  handleEnter,
  sortUsedLetters,
  updateKeyboard,
  rememberCorrectPosition,
  updateLineColor,
  changeLineDown,
  enterALetter,
} from "./input.js";

import { processWord } from "./guessManipulation.js";

import { getWordToGuess, clearSave, saveGame } from "./gameState.js";

export function restoreGame(saved) {
  clearGame();

  setWordToGuess(saved.wordToGuess);

  buildGameGrid(saved.wordToGuess);
  setupFirstLetter(saved.wordToGuess);
  buildKeyboard(state.keyboard);

  initInput();
  state.guesses = saved.guesses;
  state.currentPlacement = 1;

  replayGuesses(saved.guesses);
}

export function replayGuesses(guesses) {
  console.log(state.guesses);
  console.log(state.wordToGuess);
  guesses.forEach((guess, index) => {
    console.log(guess);
    for (let i = 1; i < guess.length; i++) {
      enterALetter(guess[i]);
    }

    const { wrongLetters, misplaced, correct, position } = processWord(guess);
    sortUsedLetters(wrongLetters, misplaced, correct);
    updateKeyboard(
      state.gameState.wrongLetters,
      state.gameState.misplaced,
      state.gameState.correct,
    );
    rememberCorrectPosition(guess);
    updateLineColor(position);
    changeLineDown();
  });
}
