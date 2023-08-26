import React from "react";
import { DanceFloorProps } from "../types/types";

export const DanceFloor: React.FC<DanceFloorProps> = ({ children, game }) => {
  const multiplayerLayout = game?.newGame?.players.length > 1;

  return (
    <div
      className={`grid w-full flex-1  place-items-center gap-4 rounded-3xl bg-black/0 p-2 ${
        multiplayerLayout && "grid-cols-2"
      } `}
    >
      {children}
    </div>
  );
};
