export function openCloseInstructions() {
  const btnInstructionsOpen = document.querySelectorAll(".btn-help");
  const instructions = document.querySelector(".instructions");
  const overlay = document.querySelector(".instructions-overlay");

  btnInstructionsOpen.forEach((btn) => {
    btn.addEventListener("click", () => {
      instructions.classList.toggle("opened");
    });
  });

  overlay.addEventListener("click", () => {
    instructions.classList.remove("opened");
  });
}
