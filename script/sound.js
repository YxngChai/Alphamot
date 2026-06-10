export const SoundManager = {
  sounds: {
    error: new Audio("/Alphamot/data/sounds/error.mp3"),
    win: new Audio("/Alphamot/data/sounds/win.mp3"),
    nextrow: new Audio("/Alphamot/data/sounds/nextrow.mp3"),
    backspace: new Audio("/Alphamot/data/sounds/backspace.mp3"),
    restart: new Audio("/Alphamot/data/sounds/restart.mp3"),
    menu: new Audio("/Alphamot/data/sounds/menuedited.mp3"),
    loss: new Audio("/Alphamot/data/sounds/loss.mp3"),
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
