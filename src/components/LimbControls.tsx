import React from "react";

import interfaceClick from "../assets/interface click.wav";

import type { LimbControlsProps, Player } from "../types/types";
import { LimbEnum } from "../types/types";
import { howl } from "howler";

const interfaceClickAudio = new Howl({
  src: [interfaceClick],
});

export const LimbControls: React.FC<LimbControlsProps> = ({ game }) => {
  const { controlsOrder, autoLimb } = game?.newGame?.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  const controlColors: Record<string, string> = {
    "Left Arm": "bg-ronchi",
    "Right Arm": "bg-willpower-orange",
    "Left Leg": "bg-vivid-raspberry",
    "Right Leg": "bg-blue-purple",
  };

  const onClickHandler = (limb: LimbEnum) => {
    interfaceClickAudio.play(); /* THIS HAPPENS ONLY ON THE INITIATING PLAYERS DEVICE */
    /* TELLS SERVER TO UPDATE THE LIMB POSE FOR THE ACTIVATING PLAYER - SEE ACTIONS IN LOGIC.TS */
    Rune.actions.toggleLimb({
      limb: limb,
    });
  };

  /* RENDERING OUT THE FOUR LIMB CONTROLS */
  return (
    <div className="flex h-3/4 w-full overflow-clip rounded-3xl border-8 border-black bg-black/0">
      {controlsOrder.map((control: string) => {
        const buttonColor = controlColors[control];

        return (
          <button
            key={control}
            className={`relative h-full w-full rounded-none bg-black/0
              p-8 text-xs font-black outline-none transition-all active:opacity-70
              ${
                autoLimb && control === "Left Arm"
                  ? "bg-slate-400"
                  : buttonColor
              }`}
            onClick={
              autoLimb && control === "Left Arm"
                ? () => {}
                : () => {
                    onClickHandler(
                      LimbEnum[
                        control.replace(/\s+/g, "") as keyof typeof LimbEnum
                      ],
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
      })}
    </div>
  );
};
