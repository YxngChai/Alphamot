// Change color of active Row
// const activeRow = document.querySelectorAll(".activeRow");
// activeRow.forEach((Case) => {
//   Case.classList.add("activeCase");
// });

const rowTest = document.querySelectorAll(".rowTest");
// rowTest.forEach((box) => {
//   box.innerHTML = "A";
// });
let current = 0;
// document.addEventListener("keydown", (event) => {});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Backspace") {
    if (current > 0) {
      current--;
      rowTest[current].textContent = "";
    }

    // current = Math.max(0, current);
    console.log(current);
    // Add block for not changing if its last character
  } else if (/^[a-zA-Z]$/.test(key)) {
    if (current < rowTest.length) {
      rowTest[current].innerHTML = key.toUpperCase();
      current++;
    }
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Enter") {
    let word = "";
    rowTest.forEach((letter) => {
      word += letter.textContent;
    });
    console.log(word);
  }
});
