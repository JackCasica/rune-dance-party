import React from "react";
import { LimbEnum } from "../types/types";
import interfaceClick from "../assets/interface click.wav";
import { useSound } from "../hooks/useSound";
import LeftArmControl from "../assets/limb controls/Left Arm Control.png";
import LeftLegControl from "../assets/limb controls/Left Leg Control.png";
import RightArmControl from "../assets/limb controls/Right Arm Control.png";
import RightLegControl from "../assets/limb controls/Right Leg Control.png";

type LimbButtonProps = {
  control: string;
  autoLimbActive: boolean;
};

export const LimbButton: React.FC<LimbButtonProps> = ({
  control,
  autoLimbActive,
}) => {
  const interfaceClickAudio = useSound(interfaceClick);

  const onClickHandler = (limb: LimbEnum) => {
    interfaceClickAudio.play(); /* THIS HAPPENS ONLY ON THE INITIATING PLAYERS DEVICE */
    /* TELLS SERVER TO UPDATE THE LIMB POSE FOR THE ACTIVATING PLAYER - SEE ACTIONS IN LOGIC.TS */
    Rune.actions.toggleLimb({
      limb: limb,
    });
  };

  let buttonImg = LeftArmControl;
  let limbEnum = 0;

  switch (control) {
    case "Left Arm":
      buttonImg = LeftArmControl;
      limbEnum = 0;
      break;
    case "Left Leg":
      buttonImg = LeftLegControl;
      limbEnum = 2;
      break;
    case "Right Arm":
      buttonImg = RightArmControl;
      limbEnum = 1;
      break;
    case "Right Leg":
      buttonImg = RightLegControl;
      limbEnum = 3;
      break;
  }
  return (
    <button
      key={control}
      className={`relative h-full w-full rounded-none bg-black/0
    p-8 text-xs font-black outline-none transition-all active:opacity-70
    ${autoLimbActive && control === "Left Arm" && "bg-slate-400"}`}
      onClick={
        autoLimbActive && control === "Left Arm"
          ? () => {
              return;
            }
          : () => {
              onClickHandler(limbEnum);
            }
      }
    >
      <img
        src={buttonImg}
        className={`absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 p-2 md:w-1/3`}
      />
    </button>
  );
};
