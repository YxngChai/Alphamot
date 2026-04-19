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
    if (
      e.target.classList.contains("fa-toggle-on") ||
      e.target.classList.contains("fa-toggle-off")
    ) {
      e.target.classList.toggle("fa-toggle-on");
      e.target.classList.toggle("fa-toggle-off");
    }
  });
}
