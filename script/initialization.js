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
