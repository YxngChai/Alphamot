import { clearSave, state } from "./gameState.js";

const shareData = {
  title: "MDN",
  text: "Try to beat me!",
  url: "https://yxngchai.github.io/Alphamot/",
};

function shareGame() {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: "My Wordle game",

      text: "Come try to beat me!",

      url: url,
    });
  } else {
    // fallback for desktop browsers

    navigator.clipboard.writeText(`Come try to beat me! ${url}`);

    alert("Link copied!");
  }
}

export function loadSharedWord() {
  const params = new URLSearchParams(window.location.search);
  const encodedWord = params.get("word");

  if (encodedWord) {
    console.log(encodedWord);
    clearSave();
    // return atob(encodedWord).toUpperCase();
    return encodedWord.toUpperCase();
  } else {
    console.log("No word");
  }
}
export function loadLanguage() {
  const params = new URLSearchParams(window.location.search);
  const challengeLang = params.get("lang");
  if (challengeLang) {
    state.language = challengeLang;
  }
}

// function shareGame() {}
