import { wordToGuess } from "./main.js";

function buildUIWrongLetters(userGuess, wordToGuess) {
  const wrongLetters = [];
  for (let i = 0; i < userGuess.length; i++) {
    if (
      !wordToGuess.includes(userGuess[i]) &&
      !wrongLetters.includes(userGuess[i])
    ) {
      wrongLetters.push(userGuess[i]);
    }
  }
  return wrongLetters;
}
function buildFrequencyMapOfWord(wordToGuess) {
  let letterCount = {};
  for (let char of wordToGuess) {
    letterCount[char] = (letterCount[char] || 0) + 1;
  }
  return letterCount;
}
export function processWord(userGuess) {
  // Create an empty list length of word where items will later be replaced with patterns to style a valid line
  let position = new Array(wordToGuess.length).fill("");

  // 3 lists to collect letters to update the UI keyboard with the right color;
  const misplaced = [];
  const correct = [];

  const wrongLetters = buildUIWrongLetters(userGuess, wordToGuess);

  const letterCount = buildFrequencyMapOfWord(wordToGuess);

  //first pass to mark correct letteres
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === wordToGuess[i]) {
      position[i] = "correct";
      letterCount[userGuess[i]]--;
      correct.push(userGuess[i]);
    }
  }
  //second pass for misplaced letter
  for (let i = 0; i < userGuess.length; i++) {
    if (position[i] === "correct") continue;
    let char = userGuess[i];
    if (letterCount[char] > 0) {
      position[i] = "misplaced";
      letterCount[char]--;
      misplaced.push(char);
    }
    //  list of useless Letters
  }

  let newMisplaced = [...misplaced].filter(
    (item) => ![...correct].includes(item),
  );
  return {
    wrongLetters,
    newMisplaced,
    correct,
    position,
  };
}
