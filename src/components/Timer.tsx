import React, { useEffect, useState } from "react";

export const Timer = ({ game }) => {
  const [offset, setOffset] = useState(0);
  const radius = 130;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progress = game.newGame.remainingTime / 60;
    const offsetValue = circumference - progress * circumference;
    setOffset(offsetValue);
  }, [game.newGame.remainingTime]);

  return (
    <svg
      width="100%"
      height="100%"
      className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2"
    >
      <circle
        stroke="black"
        fill="transparent"
        strokeWidth="200"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="50%"
        cy="50%"
        style={{ transition: "stroke-dashoffset 1s linear" }}
      />
    </svg>
  );
};
