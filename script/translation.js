import { state, resetState } from "./gameState.js";
import { playGame } from "./main.js";
import {
  setGameLanguage,
  clearGame,
  renderHomePage,
} from "./initialization.js";
import { restartTheGame } from "./input.js";
import { SoundManager } from "./sound.js";

export const translations = {
  en: {
    play: "Play",
    settingsTitle: "Settings",
    language: "Language",
    keyboardLg: "English",
    changeLG: "Change Language",
    darkMode: "Dark Mode",
    sound: "Sound",
    replay: "Play Again",
    correctAnswer: (word) => `${word}: `, // add definition
    instructionsTitle: "How to Play",
    instructions_line1: "You have 6 tries to guess the hidden word",
    instructions_line2: "Type a valid word and press enter",
    instructions_line3: "🟩 Green → correct letter in the correct position",
    instructions_line4: "🟨 Yellow → correct letter but wrong position",
    instructions_line5: "🟦 Gray → letter is not in the word",
    instructions_line6: "Find the correct word in as few tries as possible!",
    statistics: "Statistics",
  },
  fr: {
    play: "Jouer",
    settingsTitle: "Paramètres",
    language: "Langue",
    keyboardLg: "Français",
    changeLG: "Changer la langue",
    darkMode: "Mode Sombre",
    sound: "Son",
    replay: "Rejouer",
    correctAnswer: (word) => `Bonne Réponse: ${word}`,
    instructionsTitle: "Comment jouer",
    instructions_line1: "Vous avez 6 essais pour deviner le mot caché",
    instructions_line2: "Tapez un mot valide et appuyez sur Entrée.",
    instructions_line3: "🟩 Vert → lettre correcte à la bonne position",
    instructions_line4: "🟨 Jaune → lettre correcte mais mauvaise position",
    instructions_line5: "🟦 Blue → la lettre n’est pas dans le mot",
    instructions_line6: "Trouvez le mot correct en un minimum d’essais !",
    statistics: "Statistiques",
  },
  "pt-BR": {
    play: "Jogar",
    settingsTitle: "Configurações",
    language: "Idioma",
    keyboardLg: "Brazilian Portuguese",
    changeLG: "Mudar idioma",
    darkMode: "Modo Escuro ",
    sound: "Som",
    replay: "Jogar novamente",
    correctAnswer: (word) => `Resposta correta: ${word}`,
    instructionsTitle: "Como jogar",
    instructions_line1: "São 6 tentativas para adivinhar a palavra secreta.",
    instructions_line2: "Digite uma palavra válida e pressione Enter",
    instructions_line3: "🟩 Verde → letra correta na posição correta",
    instructions_line4: "🟨 Amarelo → letra correta, mas na posição errada",
    instructions_line5: "🟦 Azul → a letra não está na palavra",
    instructions_line6:
      "Encontre a palavra correta com o menor número de tentativas possível!",
    statistics: "Estatísticas",
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
}

export function changeLanguage() {
  const buttons = document.querySelectorAll(".languageBtn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      SoundManager.play("menu");
      buttons.forEach((b) => {
        const icon = b.querySelector("i");
        icon.classList.toggle("selectedFlag", b === btn);
        icon.classList.toggle("unselectedFlag", b !== btn);
      });
      state.language = btn.dataset.lang;
      localStorage.setItem("lang", state.language);

      renderHomePage();
      setGameLanguage();
      updateTexts();
      styleFlagLanguageOptions();
      resetState();
      localStorage.removeItem("alphamot-save");
    });
  });
}
