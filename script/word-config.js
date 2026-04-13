const wordToGuess = "AABC";
let copy = [...wordToGuess];

const userGuess = "ADAA";

let count = 0;

let position = [];
for (let i = 0; i < wordToGuess.length; i++) {
  position.push("");
}

console.log(position);

for (let i = 0; i < userGuess.length; i++) {
  if (copy.includes(userGuess[i])) {
    position[i] = "missplaced";
    let index = copy.indexOf(userGuess[i]);
    copy.splice(index, 1);
  }
  if (userGuess[i] === wordToGuess[i]) {
    position[i] = "correct";
  }
}

console.log(position);
console.log(copy);

function compareWords() {}
