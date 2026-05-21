const btnInstructionsOpen = document.querySelectorAll(".btn-help");
const instructions = document.querySelector(".instructions");

export function openCloseInstructions() {
  btnInstructionsOpen.forEach((btn) => {
    btn.addEventListener("click", () => {
      instructions.classList.toggle("opened");
    });
  });
}
