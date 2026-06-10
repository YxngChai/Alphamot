export const SoundManager = {
  sounds: {
    error: new Audio("../data/sounds/error.mp3"),
    win: new Audio("../data/sounds/win.mp3"),
    nextrow: new Audio("../data/sounds/nextrow.mp3"),
    backspace: new Audio("../data/sounds/backspace.mp3"),
    restart: new Audio("../data/sounds/restart.mp3"),
    menu: new Audio("../data/sounds/menuedited.mp3"),
    loss: new Audio("../data/sounds/loss.mp3"),
  },
  muted: false,

  play(name) {
    if (this.muted) return;

    const sound = this.sounds[name];
    if (!sound) return;
    const clone = sound.cloneNode();
    clone.currentTime = 0;
    try {
      clone.play().catch((err) => {
        console.warn("Audio play blocked:", err);
      });
    } catch (err) {
      console.warn("Sound error:", err);
    }
  },
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("sound", this.muted ? "off" : "on");
    SoundManager.play("menu");
  },
};

export function initSound() {
  const soundState = localStorage.getItem("sound");
  if (!soundState) {
    localStorage.setItem("sound", "on");
  }
  if (soundState === "off") {
    const toggleIcon = document.querySelector(".sound-btn");
    toggleIcon.classList.replace("fa-toggle-on", "fa-toggle-off");
  }
  SoundManager.muted = localStorage.getItem("sound") === "off";
}

function toggleSound() {
  const current = localStorage.getItem("sound") ?? "on";
  const next = current === "on" ? "off" : "on";
  localStorage.setItem("sound", next);
}
