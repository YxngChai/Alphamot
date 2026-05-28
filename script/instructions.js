import { SoundManager } from "./sound.js";

export function openCloseInstructions() {
  const btnInstructionsOpen = document.querySelectorAll(".btn-help");
  const instructions = document.querySelector(".instructions");
  const overlay = document.querySelector(".instructions-overlay");

  btnInstructionsOpen.forEach((btn) => {
    btn.addEventListener("click", () => {
      SoundManager.play("menu");
      instructions.classList.toggle("opened");
    });
  });

  overlay.addEventListener("click", () => {
    SoundManager.play("menu");
    instructions.classList.remove("opened");
  });
}
