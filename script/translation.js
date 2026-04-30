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
    correctAnswer: (word) => `Correct Answer: ${word}`,
  },
  fr: {
    settingsTitle: "Paramètres",
    language: "Langue",
    darkMode: "Mode Sombre",
    sound: "Son",
    replay: "Rejouer",
    correctAnswer: (word) => `Bonne Réponse: ${word}`,
  },
  "pt-BR": {
    settingsTitle: "Configurações",
    language: "Idioma",
    darkMode: "Modo Escuro ",
    sound: "Som",
    replay: "Jogar novamente",
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
