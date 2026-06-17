import { clearSave, state } from "./gameState.js";

export function shareGame() {
  const encodedWord = btoa(state.wordToGuess);
  const shareUrl = new URL(window.location.origin);

  shareUrl.searchParams.set("lang", state.language);
  shareUrl.searchParams.set("word", encodedWord);

  if (navigator.share) {
    navigator.share({
      title: "Alphamot",
      text: "Come try to beat me!",
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
