const mots = [
  "pardon",
  "chalet",
  "bateau",
  "fraise",
  "garage",
  "valise",
  "tomate",
  "pierre",
  "chemin",
  "plante",
  "orange",
  "maison",
  "brosse",
  "animal",
  "bureau",
  "cactus",
  "bassin",
  "ballet",
  "crayon",
  "voyage",
];

const animals = [
  "monkey",
  "rabbit",
  "turtle",
  "donkey",
  "falcon",
  "parrot",
  "beaver",
  "jaguar",
  "cougar",
  "lizard",
];

export let wordToGuess =
  animals[Math.floor(Math.random() * animals.length)].toUpperCase();

function setupFirstLetter() {
  const firstRow = document.querySelectorAll(".currentRow");
  firstRow[0].textContent = wordToGuess[0];
}

export function buildGameGrid() {
  const grid = document.querySelector(".gameGrid");
  // can be changed in futur for difficulty options
  let nbLines = 6;
  for (let i = 0; i < nbLines; i++) {
    const row = document.createElement("div");
    row.classList.add("gridRow");
    grid.appendChild(row);
  }
  const testRows = document.querySelectorAll(".gridRow");
  testRows.forEach((row, index) => {
    for (let i = 0; i < wordToGuess.length; i++) {
      const cell = document.createElement("div");
      index === 0
        ? cell.classList.add("currentRow")
        : cell.classList.add("upcomingRow");
      row.appendChild(cell);
    }
  });
  setupFirstLetter();
}
