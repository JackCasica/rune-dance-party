import React, { useEffect, useState } from "react";
import { playSound } from "../util/playSound";
import pageTurn from "../assets/page turn.wav";
import { RoundTimerProps } from "../types/types";
import { Card } from "./Card";
import {
  CardProps,
  CardsProps,
  Player,
  StageProps,
  StageContainerProps,
} from "../types/types";

import { RoundTimer } from "./RoundTimer";
import { Timer } from "./Timer";
import { ActiveCard } from "./ActiveCard";

export const Cards: React.FC<CardsProps> = ({
  children,
  game,
  activeCardIndex,
  setActiveCardIndex,
}) => {
  const gameTimerProgress = 60 - game.newGame.remainingTime;
  const INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS

  const [progress, setProgress] = useState<number>(
    60 - game.newGame.remainingTime,
  );
  const [stageCards, setStageCards] = useState<CardProps[]>(
    game.newGame.cardStack.slice(1),
  );
  const [activeCard, setActiveCard] = useState<CardProps>(
    game.newGame.cardStack[0],
  );

  const [transition, setTransition] = useState<string>(
    "transition-all duration-1000 ease-linear",
  );

  useEffect(() => {
    Rune.actions.updateActiveCard(0);
  }, []);

  useEffect(() => {
    // TRIGGERED BY THE ACTIVE CARD INDEX CHANGING (skips initial render tho)
    if (activeCardIndex > 0) {
      setActiveCard(stageCards[0]);
      setStageCards((prev) => prev.slice(1));
    }
  }, [activeCardIndex]);

  useEffect(() => {
    // ENSURES THE ROUND TIMER STAYS IN SYNC WITH GAME TIMER
    setProgress(gameTimerProgress);

    // INCREMENT PROGRESS BAR EVERY SECOND
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
      if (progress > 59) {
        clearInterval(interval);
      }
    }, 1000); // Increment progress every second
    return () => clearInterval(interval);
  }, [gameTimerProgress, progress]);

  useEffect(() => {
    // IF THE ROUND TIMER BAR IS STARTING OVER
    // THEN SCORE & TURN THE NEXT CARD OVER
    if (progress % INTERVAL === 0 && progress < 59 && progress > 0) {
      Rune.actions.checkPlayerPoses({ index: activeCardIndex });
      // Rune.actions.getStreak();

      if (stageCards.length > 0) {
        // WHEN THE ROUND ENDS, SCORE THE PREVIOUS CARD'S POSES
        // Rune.actions.checkPlayerPoses({ index: activeCardIndex });
        // THEN TURN TO THE NEW CARD (this triggers the useEffect below)
        // Rune.actions.updateActiveCard(activeCardIndex + 1)
        setActiveCardIndex((prev: number) => prev + 1);
      }

      Rune.actions.incrementRoundNumber();
      playSound(pageTurn);
    }
  }, [progress]);

  useEffect(() => {
    // SCORE THE LAST ROUND A SECOND EARLY so gameOver doesn't interfere... may change later
    if (game.newGame.currentRound === 10 && game.newGame.remainingTime === 1) {
      Rune.actions.checkPlayerPoses({ index: activeCardIndex });
    }
  }, [game.newGame.currentRound, game.newGame.remainingTime]);

  return (
    <div className="relative h-fit w-full rounded-3xl bg-pink-600 p-2">
      <div
        id="active-card"
        className={` h-[25vw] w-[20vw] ${
          activeCard || "rounded-xl border-4 border-dashed border-black"
        }`}
      >
        {activeCard ? (
          <Card
            active={true}
            color={activeCard.color}
            limbs={activeCard.limbs}
            shown={true}
          />
        ) : (
          <> </>
        )}
      </div>
      <div className="cards">{children}</div>
    </div>
  );
};
