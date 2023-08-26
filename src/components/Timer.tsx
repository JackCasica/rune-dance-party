import React, { useEffect, useState } from "react";

const radius = 50;
const circumference = 2 * Math.PI * radius;
const INTERVAL = 6;

export const Timer = ({ game }) => {
  /* TIMER */
  const [offset, setOffset] = useState(0);

  // 1. Add new state variable
  const [timeLeftInRound, setTimeLeftInRound] = useState<number>(INTERVAL);

  // 2. Update time left in round
  useEffect(() => {
    const progress = 60 - game?.newGame.remainingTime;
    const timeInRound = progress % INTERVAL;
    setTimeLeftInRound(INTERVAL - timeInRound);
  }, [game?.newGame.remainingTime]);

  // 3. Update offset calculation
  useEffect(() => {
    const progress = timeLeftInRound / INTERVAL;
    const offsetValue = circumference - progress * circumference;
    setOffset(offsetValue);
  }, [timeLeftInRound, circumference]);

  return (
    <svg
      width="100%"
      height="100%"
      className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 -rotate-45"
    >
      <circle
        stroke="#ff006e"
        fill="transparent"
        strokeWidth="50"
        strokeDasharray={circumference}
        strokeDashoffset={`${offset}`}
        r={radius}
        cx="50%"
        cy="50%"
        style={{ transition: "stroke-dashoffset 1s linear" }}
      />
    </svg>
  );
};
