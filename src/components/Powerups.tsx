import React, { useEffect } from "react";
import revealBonus from "../assets/reveal bonus.wav";
import shuffle from "../assets/shuffle.wav";
import spellWaves from "../assets/spell waves.wav";
import type { PowerUpsProps, Player } from "../types/types";
import { PowerUpButton } from "./PowerUpButton";
import { useSound } from "../hooks/useSound";
import attractImg from "../assets/attract.png";
import autoLimbImg from "../assets/auto-limb.png";
import shuffleImg from "../assets/shuffle.png";

export const Powerups: React.FC<PowerUpsProps> = ({
  game,
  activeCardIndex,
  player,
}) => {
  const { controlsOrder: oldControlsOrder } = game.oldGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  const { correctStreak, controlsOrder } = player;
  const shuffleAudio = useSound(shuffle);
  const spellWavesAudio = useSound(spellWaves);
  const revealBonusAudio = useSound(revealBonus);

  const runPowerup = (powerup: string, cost: number) => {
    if (correctStreak >= cost) {
      switch (powerup) {
        case "shuffle":
          shuffleAudio.play();
          Rune.actions.shuffleEnemyControls();
          break;
        case "attract":
          revealBonusAudio.play();
          Rune.actions.toggleAttract();
          break;
        case "autoLimb":
          revealBonusAudio.play();
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
      shuffleAudio.play();
    }
  }, [controlsOrder, oldControlsOrder]);

  useEffect(() => {
    correctStreak >= 1 || (correctStreak >= 2 && spellWavesAudio.play());
  }, [correctStreak]);

  return (
    <div className="flex h-fit gap-2 bg-black/0">
      <PowerUpButton
        powerUp="attract"
        imageSource={attractImg}
        soundEffect={revealBonus}
        correctStreak={correctStreak}
        cost={1}
        onClickHandler={runPowerup}
      />
      <PowerUpButton
        powerUp="autoLimb"
        imageSource={autoLimbImg}
        soundEffect={revealBonus}
        correctStreak={correctStreak}
        cost={2}
        onClickHandler={runPowerup}
      />
      <PowerUpButton
        powerUp="shuffle"
        imageSource={shuffleImg}
        soundEffect={shuffle}
        correctStreak={correctStreak}
        cost={3}
        onClickHandler={runPowerup}
      />
    </div>
  );
};
