import { state } from "./gameState.js";
import { playGame } from "./main.js";
import { setGameLanguage } from "./initialization.js";

const translations = {
  en: {
    settingsTitle: "Settings",
    language: "Language",
    darkMode: "Dark Mode",
    sound: "Sound",
    replay: "Play Again",
    instructionsTitle: "How to Play",
    correctAnswer: (word) => `Correct Answer: ${word}`,
    instructions: `
    You have 6 tries to guess the hidden 5-letter word.
Type a valid word and press enter.

🟩 Green → correct letter in the correct position
🟨 Yellow → correct letter but wrong position
⬜ Gray → letter is not in the word

Find the correct word in as few tries as possible!`,
  },
  fr: {
    settingsTitle: "Paramètres",
    language: "Langue",
    darkMode: "Mode Sombre",
    sound: "Son",
    replay: "Rejouer",
    instructionsTitle: "Comment jouer",
    correctAnswer: (word) => `Bonne Réponse: ${word}`,
  },
  "pt-BR": {
    settingsTitle: "Configurações",
    language: "Idioma",
    darkMode: "Modo Escuro ",
    sound: "Som",
    replay: "Jogar novamente",
    instructionsTitle: "Como jogar",
    correctAnswer: (word) => `Resposta correta: ${word}`,
  },
};
export function styleFlagLanguageOptions() {
  const buttons = document.querySelectorAll(".languageBtn");
  buttons.forEach((btn) => {
    const icon = btn.querySelector("i");
    const isActive = btn.dataset.lang === state.language;

    icon.classList.toggle("selectedFlag", isActive);
    icon.classList.toggle("unselectedFlag", !isActive);
  });
}

export function updateTexts() {
  const lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent =
      typeof translations[lang][key] === "function"
        ? translations[lang][key](el.dataset.word)
        : translations[lang][key];
  });
  console.log(state.language);
}

export function changeLanguage() {
  const buttons = document.querySelectorAll(".languageBtn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        const icon = b.querySelector("i");
        icon.classList.toggle("selectedFlag", b === btn);
        icon.classList.toggle("unselectedFlag", b !== btn);
      });
      state.language = btn.dataset.lang;
      localStorage.setItem("lang", state.language);

      setGameLanguage();
      updateTexts();
      styleFlagLanguageOptions();
      playGame();
    });
  });
}
