import React, { useEffect, useState } from "react";

import { Card, Player, StageProps, StageContainerProps } from "../types/types";
import { RoundTimer } from "./RoundTimer";
import { StageCard } from "./StageCard";
import { Timer } from "./Timer";
import { Deck } from "./Deck";
import { ActiveCard } from "./ActiveCard";

const StageContainer: React.FC<StageContainerProps> = ({ children }) => {
  return (
    <div className="relative h-fit w-full overflow-hidden rounded-3xl bg-pink-600 p-2">
      {children}
    </div>
  );
};

export const Stage: React.FC<StageProps> = ({
  game,
  activeCardIndex,
  setActiveCardIndex,
}) => {
  const [stageCards, setStageCards] = useState<Card[]>(
    game?.newGame?.cardStack.slice(1),
  );
  const [activeCard, setActiveCard] = useState<Card>(
    game?.newGame?.cardStack[0],
  );
  const { predictor } = game?.newGame?.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );
  // const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  useEffect(() => {
    Rune.actions.updateActiveCard(0);
  }, []);

  const turnCard = () => {
    if (stageCards.length > 0) {
      // WHEN THE ROUND ENDS, SCORE THE PREVIOUS CARD'S POSES
      // Rune.actions.checkPlayerPoses({ index: activeCardIndex });
      // THEN TURN TO THE NEW CARD (this triggers the useEffect below)
      // Rune.actions.updateActiveCard(activeCardIndex + 1)
      setActiveCardIndex((prev: number) => prev + 1);
    }
  };

  useEffect(() => {
    // TRIGGERED BY THE ACTIVE CARD INDEX CHANGING (skips initial render tho)
    if (activeCardIndex > 0) {
      setActiveCard(stageCards[0]);
      setStageCards((prev) => prev.slice(1));
    }
  }, [activeCardIndex]);

  return (
    <StageContainer>
      <Timer game={game} />
      <div
        id="stage"
        className="relative flex  h-fit w-full  gap-4 overflow-hidden rounded-2xl bg-orange-500 p-4"
      >
        <RoundTimer
          game={game}
          turnCard={turnCard}
          activeCardIndex={activeCardIndex}
        />
        <ActiveCard activeCard={activeCard} />
        <Deck stageCards={stageCards} predictor={predictor} />
      </div>
    </StageContainer>
  );
};
