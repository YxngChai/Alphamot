export const SoundManager = {
  sounds: {
    entry: new Audio("../data/sounds/entry.mp3"),
    error: new Audio("../data/sounds/error.mp3"),
    win: new Audio("../data/sounds/win.mp3"),
    nextrow: new Audio("../data/sounds/nextrow.mp3"),
    backspace: new Audio("../data/sounds/backspace.mp3"),
    restart: new Audio("../data/sounds/restart.mp3"),
    menu: new Audio("../data/sounds/menu.mp3"),
  },

  play(name) {
    const sound = this.sounds[name];
    if (!sound) return;
    const clone = sound.cloneNode();
    clone.currentTime = 0;
    clone.play();
  },
};
