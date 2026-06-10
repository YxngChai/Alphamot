import { SoundManager } from "./sound.js";

const btnSettingsOpen = document.querySelectorAll(".open-settings");
const settings = document.querySelector(".settings");

export function openCloseSettings() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".open-settings")) {
      SoundManager.play("menu");
      settings.classList.toggle("opened");
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.matches(".settings-overlay")) {
      settings.classList.remove("opened");
    }
  });
  // const overlay = document.querySelector(".settings-overlay");
  // overlay.addEventListener("click", () => {
  //   settings.classList.remove("opened");
  // });
}

export function AnimateToggleSettings() {
  document.addEventListener("click", (e) => {
    const row = e.target.closest(".setting-option");

    if (!row) return;

    const icon = row.querySelector("i");

    if (!icon) return;

    icon.classList.toggle("fa-toggle-on");
    icon.classList.toggle("fa-toggle-off");
  });
}

export function initDarkMode() {
  const darkModeBtn = document.querySelector(".darkModeBtn");
  const saved = localStorage.getItem("darkMode");
  if (saved === "on") {
    document.body.classList.add("dark");
    const toggleIcon = darkModeBtn.querySelector(".toggleIcon");
    toggleIcon.classList.replace("fa-toggle-off", "fa-toggle-on");
  } else {
    document.body.classList.remove("dark");
  }

  darkModeBtn.addEventListener("click", () => {
    SoundManager.play("menu");
    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("darkMode", isDark ? "on" : "off");
  });
}

export function activateSound() {
  const soundBtn = document.querySelector(".sound-btn");

  soundBtn.addEventListener("click", () => {
    SoundManager.toggleMute();
  });
}
