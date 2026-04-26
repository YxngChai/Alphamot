export const state = {
  wordToGuess: "",
  currentPlacement: 1,
  tries: 0,
  rowCounter: 0,
  userGuess: "",
  correctPositions: [],
  gameState: {
    wrongLetters: [],
    misplaced: [],
    correct: [],
  },
  gameOver: false,
  language: "",
  wordPool: [],
  verificationSet: new Set(),
};

export function resetState() {
  state.currentPlacement = 1;
  state.correctPositions = [];
  state.rowCounter = 0;
  state.tries = 0;
  state.userGuess = "";
  state.gameState = {
    wrongLetters: [],
    misplaced: [],
    correct: [],
  };
  state.gameOver = false;
}

export function setWordToGuess(word) {
  state.wordToGuess = word;
}
export function getWordToGuess() {
  return state.wordToGuess;
}
