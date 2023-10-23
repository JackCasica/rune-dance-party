import React from "react";
import { useEffect, useState } from "react";

import earnPoints from "../assets/earn-points.wav";
import noPoints from "../assets/no-points.wav";
import { CharacterProps, LimbEnum } from "../types/types";
import { Body } from "./Body";
import { Limb } from "./Limb";
import { PlayerDetails } from "./PlayerDetails";
import { useSound } from "../hooks/useSound";

export const Character: React.FC<CharacterProps> = ({
  displayName,
  player,
  yourPlayerId,
  currentRound,
}) => {
  const [showScore, setShowScore] = useState(false);
  const earnPointsAudio = useSound(earnPoints);
  const noPointsAudio = useSound(noPoints);

  useEffect(() => {
    if (player.scoreForRound > 0 && player.playerId === yourPlayerId) {
      earnPointsAudio.play();
    }

    if (
      currentRound !== 1 &&
      player.scoreForRound === 0 &&
      player.playerId === yourPlayerId
    ) {
      noPointsAudio.play();
    }

    player.totalScore !== 0 && setShowScore(true);

    const timer = setTimeout(() => {
      setShowScore(false);
    }, 500);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [player.scoreForRound, player.totalScore]);

  return (
    <div
      className={`relative z-50 flex aspect-square w-full flex-col items-center justify-center rounded-3xl bg-black/0 p-4 font-black text-white`}
    >
      <PlayerDetails
        displayName={displayName}
        showScore={showScore}
        scoreForRound={player.scoreForRound}
      />

      <Body player={player} currentRound={currentRound}>
        <Limb limb={LimbEnum.LeftArm} player={player} />
        <Limb limb={LimbEnum.RightArm} player={player} />
        <Limb limb={LimbEnum.LeftLeg} player={player} />
        <Limb limb={LimbEnum.RightLeg} player={player} />
      </Body>
    </div>
  );
};
