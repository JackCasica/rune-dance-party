import React from "react";

import { LimbControls } from "./LimbControls";

import type { ControlsProps } from "../types/types";

import { Powerups } from "./Powerups";

export const Controls: React.FC<ControlsProps> = ({
  game,
  player,
  activeCardIndex,
  controlsColor,
}) => {
  /* RENDERING OUT THE BOTTOM CONTROLS INCLUDING THE POWERS UPS, AND LIMB CONTROLS */
  return (
    <div className=" z-50 flex w-full flex-col  gap-2 bg-black/0 p-4">
      <Powerups game={game} activeCardIndex={activeCardIndex} player={player} />
      <LimbControls player={player} />
    </div>
  );
};
