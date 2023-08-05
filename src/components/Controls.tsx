import React, { useState, useEffect } from "react";
import { LimbEnum } from "../types/types";
import interfaceClick from "../assets/interface click.wav";
import { ControlsProps } from "../types/types";

export const Controls: React.FC<ControlsProps> = ({ game, playerId }) => {
  const [streak, setStreak] = useState<number>(game.newGame.players[game.newGame.currentPlayerIndex].correctStreak); // set to player streak
  const [canShuffle, setCanShuffle] = useState<boolean>(streak === 4);
  const player = game.newGame.players[game.newGame.currentPlayerIndex]
  const controlColors: Record<string, string> = {
    "Left Arm": "bg-ronchi",
    "Right Arm": "bg-willpower-orange",
    "Left Leg": "bg-vivid-raspberry",
    "Right Leg": "bg-blue-purple",
  }

  const onClickHandler = (limb: LimbEnum) => {
    // does this activate when anyone clicks their buttons or only when player clicks their own
    new Audio(interfaceClick).play();
    /* TELLS SERVER TO UPDATE THE LIMB POSE FOR THE ACTIVATING PLAYER - SEE ACTIONS IN LOGIC.TS */
    Rune.actions.toggleLimb({
      limb: limb,
    });
  };

  useEffect(() => {
    setCanShuffle(streak === 4);
    // PLACEHOLDER SHUFFLER
    Rune.actions.shuffleControls()
    console.log(game)
    // console.log(game.newGame.players[game.newGame.currentPlayerIndex])
  }, [streak]);

  useEffect(() => {
    setStreak(game.newGame.players[game.newGame.currentPlayerIndex].correctStreak);
  }, [game.newGame.players[game.newGame.currentPlayerIndex].correctStreak])

  const shuffle = () => {};

  /* RENDERING OUT ONE BUTTON PER LIMB */
  return (
    // CONTAINER: flex row
    <div className="flex-col">
      {/* FIRST COL: power ups */}
      <div className="flex justify-center items-end h-14">
        {/* Shuffle Opponent Cards */}
        <div
          onClick={() => {
            setStreak(game.newGame.players[game.newGame.currentPlayerIndex].correctStreak)
          }}
          className={`${
            canShuffle ? "border-black" : "border-stone-400"
          } flex items-center justify-center relative w-3/4 h-3/4 text-s font-black bg-white/20 rounded-xl border-4`}
        >
          <div
            className={`${
              canShuffle ? "bg-blue-purple" : "bg-white"
            } transition-all absolute inset-0 flex items-center justify-center h-full rounded-lg`}
            style={{ width: `${(streak / 4) * 100}%` }}
          ></div>
          <div
            className={`absolute ${
              canShuffle ? "text-white" : "text-stone-600"
            }`}
          >
            Shuffle Opponent Cards
          </div>
        </div>
        {/* <button
          className="h-full py-0 text-xs font-black rounded-2xl hover:opacity-90 bg-black/20 bg-white border-black border-8"
          onClick={() => {}}
        >
          Predictor
        </button> */}
      </div>
      {/* SECOND COL: controls */}
      <div className="flex justify-center items-start h-32 pt-2">
        <div className="flex w-full h-3/4 bg-black border-8 border-black rounded-3xl overflow-clip ">
            {player.controls.map((control: string, i: number) => (
                <button
                key={`control-${player.playerId}-${i}`}
                className={`w-full h-full text-xs font-black transition-all rounded-none hover:opacity-90 bg-black/20 ${controlColors[control]}`}
                onClick={() => onClickHandler(LimbEnum[control.replace(/\s+/g, '') as keyof typeof LimbEnum])}
              >
                {control}
              </button>
            ))}

        </div>
      </div>
    </div>
  );
};
