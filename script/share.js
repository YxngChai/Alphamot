import { clearSave, state } from "./gameState.js";
import { processWord } from "./guessManipulation.js";
import { translations } from "./translation.js";

export function shareGame() {
  const encodedWord = btoa(state.wordToGuess);
  const shareUrl = new URL(window.location.href);

  shareUrl.searchParams.set("lang", state.language);
  shareUrl.searchParams.set("word", encodedWord);

  const grid = buildShareGrid();
  const text = `Alphamot
  
${grid}

${translations[state.language].shareMessage}
  `;

  if (navigator.share) {
    navigator.share({
      title: "Alphamot",
      text,
      url: shareUrl.href,
    });
  } else {
    navigator.clipboard.writeText(`Come try to beat me! ${shareUrl}`);
    alert("Link copied!");
  }
}

export function loadSharedWord() {
  const params = new URLSearchParams(window.location.search);
  const encodedWord = params.get("word");

  if (encodedWord) {
    clearSave();

    return atob(encodedWord);
  }
}
export function loadLanguage() {
  const params = new URLSearchParams(window.location.search);
  const challengeLang = params.get("lang");
  if (challengeLang) {
    state.language = challengeLang;
  }
}

const emojiMap = {
  correct: "🟩",
  misplaced: "🟨",
  wrong: "🟦",
};

export function buildShareGrid() {
  let grid = "";

  for (const guess of state.guesses) {
    const { position } = processWord(guess, true);

    for (const cell of position) {
      grid += emojiMap[cell] || "🟦";
    }
    grid += "\n";
  }
  return grid.trim();
}
