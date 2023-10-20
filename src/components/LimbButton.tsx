import React from "react";
import { LimbEnum } from "../types/types";
import { Howl } from "howler";
import interfaceClick from "../assets/interface click.wav";

const interfaceClickAudio = new Howl({
  src: [interfaceClick],
});

type LimbButtonProps = {
  control: string;
  autoLimbActive: boolean;
};

export const LimbButton: React.FC<LimbButtonProps> = ({
  control,
  autoLimbActive,
}) => {
  const onClickHandler = (limb: LimbEnum) => {
    interfaceClickAudio.play(); /* THIS HAPPENS ONLY ON THE INITIATING PLAYERS DEVICE */
    /* TELLS SERVER TO UPDATE THE LIMB POSE FOR THE ACTIVATING PLAYER - SEE ACTIONS IN LOGIC.TS */
    Rune.actions.toggleLimb({
      limb: limb,
    });
  };

  return (
    <button
      key={control}
      className={`relative h-full w-full rounded-none bg-black/0
    p-8 text-xs font-black outline-none transition-all active:opacity-70
    ${autoLimbActive && control === "Left Arm" && "bg-slate-400"}`}
      onClick={
        autoLimbActive && control === "Left Arm"
          ? () => {}
          : () => {
              onClickHandler(
                LimbEnum[control.replace(/\s+/g, "") as keyof typeof LimbEnum],
              );
            }
      }
    >
      <img
        src={`/limb controls/${control} Control.png`}
        className={`absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 p-2`}
      />
    </button>
  );
};
