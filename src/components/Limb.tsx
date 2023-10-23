import React from "react";

import { LimbEnum, LimbProps } from "../types/types";

import "../index.css";

export const Limb: React.FC<LimbProps> = ({ limb, player }) => {
  let absoluteLimbPosition;
  let limbType;
  const { autoLimb } = player;

  switch (limb) {
    case LimbEnum.LeftArm:
      absoluteLimbPosition = "left-0 top-1/4 -translate-x-[85%]";
      limbType = "LeftArm";
      break;
    case LimbEnum.RightArm:
      absoluteLimbPosition = "right-0 top-1/4 translate-x-[85%]";
      limbType = "RightArm";

      break;
    case LimbEnum.LeftLeg:
      absoluteLimbPosition =
        "left-0 bottom-0 translate-y-[85%] -translate-x-[10%]";
      limbType = "LeftLeg";

      break;
    case LimbEnum.RightLeg:
      absoluteLimbPosition =
        "right-0 bottom-0 translate-y-[85%] translate-x-[10%]";
      limbType = "RightLeg";
      break;
    default:
      absoluteLimbPosition = "left-0 top-1/4";
      break;
  }

  return (
    <div
      className={`absolute text-xl font-black ${absoluteLimbPosition} aspect-square w-3/4`}
    >
      <img
        src={`/limbs/${limbType}Pose=0.png`}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 1 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={`/limbs/${limbType}Pose=1.png`}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 2 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={`/limbs/${limbType}Pose=2.png`}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 3 ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};
