import React from "react";

import { BodyProps } from "../types/types";

import "../index.css";
import torsoBluePurple from "../assets/limbs/torso-bg-blue-purple.png";
import torsoRonchi from "../assets/limbs/torso-bg-ronchi.png";
import torsoVividRaspberry from "../assets/limbs/torso-bg-vivid-raspberry.png";
import torsoWillpowerOrange from "../assets/limbs/torso-bg-willpower-orange.png";
import crown from "../assets/crown.png";
import confusion from "../assets/confusion.png";

export const Body: React.FC<BodyProps> = ({ children, player }) => {
  const { playerColor } = player;

  let torsoImg;

  switch (playerColor) {
    case "bg-blue-purple":
      torsoImg = torsoBluePurple;
      break;
    case "bg-ronchi":
      torsoImg = torsoRonchi;
      break;
    case "bg-vivid-raspberry":
      torsoImg = torsoVividRaspberry;
      break;
    case "bg-willpower-orange":
      torsoImg = torsoWillpowerOrange;
      break;
    default:
      torsoImg = torsoBluePurple;
      break;
  }

  const shuffledControls =
    player.controlsOrder[0] !== "Left Arm" ||
    player.controlsOrder[1] !== "Left Leg" ||
    player.controlsOrder[2] !== "Right Leg" ||
    player.controlsOrder[3] !== "Right Arm";

  return (
    <div className="relative flex w-1/2 items-center justify-center rounded-full">
      <img
        src={confusion}
        className={`absolute -top-3/4 z-50 origin-bottom scale-0 transition-all duration-150 ${
          shuffledControls ? "bobbing-animation scale-100" : "scale-0 "
        }`}
      />
      <img
        src={crown}
        className={`absolute -top-3/4 z-50 origin-bottom scale-0 transition-all duration-500 ${
          player.win ? "bobbing-animation scale-100" : "scale-0 "
        }`}
      />

      <img src={torsoImg} className="bobbing-animation z-10" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { player: player });
        }
        return child;
      })}
    </div>
  );
};
