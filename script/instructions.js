import { SoundManager } from "./sound.js";

export function openCloseInstructions() {
  const btnInstructionsOpen = document.querySelectorAll(".open-help");
  const instructions = document.querySelector(".instructions");
  const overlay = document.querySelector(".instructions-overlay");

  document.addEventListener("click", (e) => {
    if (e.target.matches(".open-help")) {
      SoundManager.play("menu");
      instructions.classList.toggle("opened");
    }
    if (e.target.matches(".instructions-overlay")) {
      instructions.classList.remove("opened");
    }
  });

  // btnInstructionsOpen.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     SoundManager.play("menu");
  //     instructions.classList.toggle("opened");
  //   });
  // });

  // overlay.addEventListener("click", () => {
  //   SoundManager.play("menu");
  //   instructions.classList.remove("opened");
  // });
}
