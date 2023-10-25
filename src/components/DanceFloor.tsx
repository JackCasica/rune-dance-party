import React from "react";

import { DanceFloorProps } from "../types/types";

export const DanceFloor: React.FC<DanceFloorProps> = ({ children, game }) => {
  const multiplayerLayout = game?.newGame?.players.length > 1;

  return (
    <div
      className={`relative  grid w-full flex-1  place-items-center gap-16 self-center rounded-3xl   md:w-3/4  ${
        multiplayerLayout && "grid-cols-2"
      } `}
    >
      {children}
    </div>
  );
};
