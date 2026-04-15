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

export function setupFirstLetter() {
  const firstRow = document.querySelectorAll(".currentRow");
  firstRow[0].textContent = wordToGuess[0];
}

export function buildGameGrid() {
  const testRows = document.querySelectorAll(".gridRow");
  testRows.forEach((row, index) => {
    for (let i = 0; i < wordToGuess.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("activeRow");
      index === 0
        ? cell.classList.add("currentRow")
        : cell.classList.add("upcomingRow");
      row.appendChild(cell);
    }
  });
}
