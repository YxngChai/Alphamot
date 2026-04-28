import { state } from "./gameState.js";

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
