import React, { useEffect, useState } from "react";
import { RoundTimerProps } from "../types/types";

export const RoundTimer: React.FC<RoundTimerProps> = ({
  game,
  scoreAndTurnCard,
  activeCardIndex,
}) => {
  const INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS
  const gameTimerProgress = 60 - game.newGame.remainingTime;
  const [progress, setProgress] = useState<number>(gameTimerProgress);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  // useEffect(() => {
  //   console.log(game);
  // }, []);

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
      scoreAndTurnCard();
      setRoundNumber((prev) => prev + 1);
    }
  }, [progress]);

  useEffect(() => {
    // SCORE THE LAST ROUND A SECOND EARLY so gameOver doesn't interfere... may change later
    if (roundNumber === 10 && game.newGame.remainingTime === 1) {
      Rune.actions.checkPlayerPoses({ index: activeCardIndex });
    }
  }, [roundNumber, game.newGame.remainingTime]);

  return (
    <>
      <div className="w-full h-10 py-2">
        <div
          className="h-full bg-white transition-all rounded-xl font-bold"
          style={{
            width: `${((progress % INTERVAL) / (INTERVAL - 1)) * 100}%`,
          }} // Calculate the width based on the progress
        />
        {/* >{progress}</div> */}
      </div>
    </>
  );
};
