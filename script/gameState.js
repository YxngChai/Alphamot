export const state = {
  wordToGuess: "",
  currentPlacement: 1,
  tries: 0,
  rowCounter: 0,
  userGuess: "",
  guesses: [],
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
  keyboard: "qwerty",
  isRestoring: false,
};

export function resetState() {
  state.currentPlacement = 1;
  state.correctPositions = [];
  state.rowCounter = 0;
  state.tries = 0;
  state.userGuess = "";
  state.guesses = [];
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

const KEY = "alphamot-save";

export function saveGame() {
  const saveData = {
    wordToGuess: state.wordToGuess,
    guesses: state.guesses,
    rowCounter: state.rowCounter,
    tries: state.tries,
  };
  localStorage.setItem(KEY, JSON.stringify(saveData));
}
export function loadGame() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}
export function clearSave() {
  localStorage.removeItem(KEY);
}
