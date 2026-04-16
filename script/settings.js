const btnSettingsOpen = document.querySelectorAll(".btn-settings");
const settings = document.querySelector(".settings");

export function openCloseSettings() {
  btnSettingsOpen.forEach((btn) => {
    btn.addEventListener("click", () => {
      settings.classList.toggle("opened");
    });
  });
}
