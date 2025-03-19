const SoundEffects = {
  playCorrect: () => {
    const sound = new Audio("/sounds/correct.mp3");
    sound.play().catch(err => console.log("Audio Play Blocked", err));
  },
  playWrong: () => {
    const sound = new Audio("/sounds/wrong.mp3");
    sound.play().catch(err => console.log("Audio Play Blocked", err));
  }
};
export default SoundEffects;
