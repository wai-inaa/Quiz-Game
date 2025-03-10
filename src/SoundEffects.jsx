const SoundEffects = {
    playCorrect: () => {
      const sound = new Audio("/sounds/correct.mp3");
      sound.play();
    },
    playWrong: () => {
      const sound = new Audio("/sounds/wrong.mp3");
      sound.play();
    }
  };

  export default SoundEffects;
  