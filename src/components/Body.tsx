import React from "react";

import { BodyProps } from "../types/types";

import "../index.css";

export const Body: React.FC<BodyProps> = ({ children, player }) => {
  const { playerColor } = player;

  const shuffledControls =
    player.controlsOrder[0] !== "Left Arm" ||
    player.controlsOrder[1] !== "Left Leg" ||
    player.controlsOrder[2] !== "Right Leg" ||
    player.controlsOrder[3] !== "Right Arm";

  return (
    <div className="relative flex w-1/2 items-center justify-center rounded-full bg-black/0">
      <img
        src="/confusion.png"
        className={`absolute -top-3/4 z-50 origin-bottom scale-0 transition-all duration-150 ${
          shuffledControls ? "bobbing-animation scale-100" : "scale-0 "
        }`}
      />
      <img
        src="/crown.png"
        className={`absolute -top-3/4 z-50 origin-bottom scale-0 transition-all duration-500 ${
          player.win ? "bobbing-animation scale-100" : "scale-0 "
        }`}
      />

      <img
        src={`/limbs/torso-${playerColor}.png`}
        className="bobbing-animation z-10"
      />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { player: player });
        }
        return child;
      })}
    </div>
  );
};
