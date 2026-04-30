const btnSettingsOpen = document.querySelectorAll(".btn-settings");
const settings = document.querySelector(".settings");

export function openCloseSettings() {
  btnSettingsOpen.forEach((btn) => {
    btn.addEventListener("click", () => {
      settings.classList.toggle("opened");
    });
  });
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
  } else {
    document.body.classList.remove("dark");
  }

  darkModeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    localStorage.setItem("darkMode", isDark ? "on" : "off");
  });
}
