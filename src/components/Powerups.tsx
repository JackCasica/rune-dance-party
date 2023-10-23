import React, { useEffect } from "react";
import revealBonus from "../assets/reveal bonus.wav";
import shuffle from "../assets/shuffle.wav";
import spellWaves from "../assets/spell waves.wav";
import type { PowerUpsProps, Player } from "../types/types";
import { playSound } from "../util/playSound";
import { PowerUpButton } from "./PowerUpButton";

export const Powerups: React.FC<PowerUpsProps> = ({
  game,
  activeCardIndex,
  player,
}) => {
  const { controlsOrder: oldControlsOrder } = game.oldGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  const { correctStreak, controlsOrder } = player;

  const runPowerup = (powerup: string, audio: string, cost: number) => {
    if (correctStreak >= cost) {
      playSound(audio);
      switch (powerup) {
        case "shuffle":
          Rune.actions.shuffleEnemyControls();
          break;
        case "attract":
          Rune.actions.toggleAttract();
          break;
        case "autoLimb":
          Rune.actions.toggleAutoLimb({
            activeCardIndex: activeCardIndex,
          });
          break;
      }

      Rune.actions.resetStreak();
    }
  };

  useEffect(() => {
    const playerControlsShuffled =
      oldControlsOrder[0] !== controlsOrder[0] ||
      oldControlsOrder[1] !== controlsOrder[1] ||
      oldControlsOrder[2] !== controlsOrder[2] ||
      oldControlsOrder[3] !== controlsOrder[3];

    if (playerControlsShuffled) {
      playSound(shuffle);
    }
  }, [controlsOrder, oldControlsOrder]);

  useEffect(() => {
    correctStreak >= 1 || (correctStreak >= 2 && playSound(spellWaves));
  }, [correctStreak]);

  return (
    <div className="flex h-fit gap-2 bg-black/0">
      <PowerUpButton
        powerUp="attract"
        imageSource="/attract.png"
        soundEffect={revealBonus}
        correctStreak={correctStreak}
        cost={1}
        onClickHandler={runPowerup}
      />
      <PowerUpButton
        powerUp="autoLimb"
        imageSource="/auto-limb.png"
        soundEffect={revealBonus}
        correctStreak={correctStreak}
        cost={2}
        onClickHandler={runPowerup}
      />
      <PowerUpButton
        powerUp="shuffle"
        imageSource="/shuffle.png"
        soundEffect={shuffle}
        correctStreak={correctStreak}
        cost={3}
        onClickHandler={runPowerup}
      />
    </div>
  );
};
