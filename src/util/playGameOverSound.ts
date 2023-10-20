import win from "../assets/game-over.wav";
import lose from "../assets/lose.wav";
import { Howl } from "howler";

const winAudio = new Howl({
  src: [win],
});

const loseAudio = new Howl({
  src: [lose],
});

export const playGameOverSound = (win) => {
  win ? winAudio.play() : loseAudio.play();
};
