import React from "react";
import { DanceFloorProps } from "../types/types";

export const DanceFloor: React.FC<DanceFloorProps> = ({ children, game }) => {
  const numberOfPlayers = game.newGame.players.length;
  console.log(numberOfPlayers);

  return (
    <div
      className={`grid w-full flex-1  place-items-center gap-4 rounded-3xl bg-black/0 bg-black/0 p-2 ${
        numberOfPlayers > 1 && "grid-cols-2"
      } `}
    >
      {children}
    </div>
  );
};
