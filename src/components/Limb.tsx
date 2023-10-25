import React from "react";
import { LimbEnum, LimbProps } from "../types/types";
import "../index.css";
import leftArmPose0 from "../assets/limbs/LeftArmPose=0.png";
import leftArmPose1 from "../assets/limbs/LeftArmPose=1.png";
import leftArmPose2 from "../assets/limbs/LeftArmPose=2.png";
import rightArmPose0 from "../assets/limbs/RightArmPose=0.png";
import rightArmPose1 from "../assets/limbs/RightArmPose=1.png";
import rightArmPose2 from "../assets/limbs/RightArmPose=2.png";
import leftLegPose0 from "../assets/limbs/LeftLegPose=0.png";
import leftLegPose1 from "../assets/limbs/LeftLegPose=1.png";
import leftLegPose2 from "../assets/limbs/LeftLegPose=2.png";
import rightLegPose0 from "../assets/limbs/RightLegPose=0.png";
import rightLegPose1 from "../assets/limbs/RightLegPose=1.png";
import rightLegPose2 from "../assets/limbs/RightLegPose=2.png";

export const Limb: React.FC<LimbProps> = ({ limb, player }) => {
  let absoluteLimbPosition;
  let limbType;
  const { autoLimb } = player;
  let limbPoses = [leftArmPose0, leftArmPose1, leftArmPose2];

  switch (limb) {
    case LimbEnum.LeftArm:
      absoluteLimbPosition = "left-0 top-1/4 -translate-x-[85%]";
      limbType = "LeftArm";
      limbPoses = [leftArmPose0, leftArmPose1, leftArmPose2];
      break;
    case LimbEnum.RightArm:
      absoluteLimbPosition = "right-0 top-1/4 translate-x-[85%]";
      limbType = "RightArm";
      limbPoses = [rightArmPose0, rightArmPose1, rightArmPose2];

      break;
    case LimbEnum.LeftLeg:
      absoluteLimbPosition =
        "left-0 bottom-0 translate-y-[85%] -translate-x-[10%]";
      limbType = "LeftLeg";
      limbPoses = [leftLegPose0, leftLegPose1, leftLegPose2];

      break;
    case LimbEnum.RightLeg:
      absoluteLimbPosition =
        "right-0 bottom-0 translate-y-[85%] translate-x-[10%]";
      limbType = "RightLeg";
      limbPoses = [rightLegPose0, rightLegPose1, rightLegPose2];
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
        src={limbPoses[0]}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 1 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={limbPoses[1]}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 2 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={limbPoses[2]}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 3 ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};
