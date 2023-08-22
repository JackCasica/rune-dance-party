export const playSound = (soundEffect: string) => {
	const gameOverAudio = new Audio(soundEffect);
	gameOverAudio.volume = 0.5; // You can adjust the volume as needed
	gameOverAudio.play();
};
