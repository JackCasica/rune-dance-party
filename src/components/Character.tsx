import React from "react";
import { useEffect, useState } from "react";

import earnPoints from "../assets/earn-points.wav";
import noPoints from "../assets/no-points.wav";
import { CharacterProps, LimbEnum } from "../types/types";
import { Limb } from "./Limb";
import "../index.css";
import { Body } from "./Body";
import { PlayerDetails } from "./PlayerDetails";
import { Howl } from "howler";
// const earnPointsAudio = new Audio(earnPoints);
// earnPointsAudio.volume = 0.2; // You can adjust the volume as needed

const earnPointsAudio = new Howl({
  src: [earnPoints],
});

const noPointsAudio = new Howl({
  src: [noPoints],
});

export const Character: React.FC<CharacterProps> = ({
  playerName,
  player,
  yourPlayerId,
  currentRound,
}) => {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (player.scoreForRound > 0 && player.playerId === yourPlayerId) {
      /* THIS CONDITIONAL MAKES IT SO THAT EACH PLAYER CAN ONLY SEE THEIR OWN SCORE UPDATE AND HEAR THEIR OWN SOUND EFFECT WHEN THEY SCORE A POINT  */

      earnPointsAudio.play();
    }
    if (
      currentRound !== 1 &&
      player.scoreForRound === 0 &&
      player.playerId === yourPlayerId
    ) {
      /* THIS CONDITIONAL MAKES IT SO THAT EACH PLAYER CAN ONLY SEE THEIR OWN SCORE UPDATE AND HEAR THEIR OWN SOUND EFFECT WHEN THEY SCORE A POINT  */

      noPointsAudio.play();
    }

    player.score !== 0 && setShowScore(true);

    const timer = setTimeout(() => {
      setShowScore(false);
    }, 500);
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [player.scoreForRound, player.score]);
  return (
    <div
      className={`relative z-50 flex aspect-square w-full flex-col items-center justify-center rounded-3xl bg-black/0 p-4 font-black  text-white`}
    >
      <PlayerDetails
        playerName={playerName}
        showScore={showScore}
        scoreForRound={player.scoreForRound}
      />
      <Body player={player}>
        <Limb limb={LimbEnum.LeftArm} player={player} />
        <Limb limb={LimbEnum.RightArm} player={player} />
        <Limb limb={LimbEnum.LeftLeg} player={player} />
        <Limb limb={LimbEnum.RightLeg} player={player} />
      </Body>
    </div>
  );
};
