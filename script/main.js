let wordToGuess = "Plante".toUpperCase();
console.log(wordToGuess);

const rows = document.querySelectorAll(".gridRow");
let currentRow = rows[0];
console.log(currentRow);

const rowTest = document.querySelectorAll(".rowTest");

let current = 0;

// Manage user input on row
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
  if (key === "Enter" && ) {
    let userGuess = "";
    rowTest.forEach((letter) => {
      userGuess += letter.textContent;
    });
    if (userGuess.length === wordToGuess.length) {
    console.log(userGuess);
    }
  }
});

// *******************


