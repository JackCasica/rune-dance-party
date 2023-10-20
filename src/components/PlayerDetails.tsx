import React from "react";

import type { PlayerDetailsProps } from "../types/types";
export const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  displayName,
  scoreForRound,
  showScore,
}) => {
  return (
    <>
      <span className="text-shadow absolute top-[20%] -translate-y-1/2">
        {displayName}
      </span>
      <span
        className={`stroke-text absolute right-0 top-0 font-black transition-all duration-200 ${
          showScore ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {scoreForRound}
      </span>
    </>
  );
};
