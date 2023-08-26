export const playSound = (soundEffect: string, volume = 0.5) => {
  const gameOverAudio = new Audio(soundEffect);
  gameOverAudio.volume = volume; // You can adjust the volume as needed
  gameOverAudio.play();
};
