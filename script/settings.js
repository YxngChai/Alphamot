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

export function toggleDarkMode() {
  const darkModeBtn = document.querySelector(".darkModeBtn");
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // const isDark = document.body.classList.contains("dark");
    // localStorage.setItem("theme", isDark ? "dark" : "light");
  });
  // if (localStorage.getItem("theme") === "dark") {
  //   document.body.classList.add("dark");
  // }
}
