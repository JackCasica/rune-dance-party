import React, { useEffect } from "react";

import interfaceClick from "../assets/interface click.wav";
import revealBonus from "../assets/reveal bonus.wav";
import spellWaves from "../assets/spell waves.wav";
import shuffle from "../assets/shuffle.wav";

import type {
  ControlsProps,
  LimbControlsProps,
  PowerUpsProps,
  Player,
} from "../types/types";
import { LimbEnum } from "../types/types";

const Powerups: React.FC<PowerUpsProps> = ({ game, activeCardIndex }) => {
  const { controlsOrder: oldControlsOrder } = game.oldGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId
  );

  const { currentRound: oldRound } = game.oldGame;
  const { currentRound } = game.newGame;

  const { correctStreak, controlsOrder } = game.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId
  );

  const onClickHandler = (powerup: string, audio: string, cost: number) => {
    if (correctStreak >= cost){
      new Audio(audio).play()
      switch (powerup){
        case 'shuffle':
          Rune.actions.shuffleEnemyControls()
          break;
        case 'predictor':
          Rune.actions.togglePredictor({ isActive: true })
          break;
        case 'autoLimb':
          Rune.actions.toggleAutoLimb({ isActive: true, index: activeCardIndex });
          break;
      }
      Rune.actions.subtractStreak(cost)
    }
  }

  useEffect(() => {
    // activates at round turnover
    if (oldRound !== currentRound){
      Rune.actions.toggleAutoLimb({ isActive: false });
      Rune.actions.togglePredictor({ isActive: false });
    }
  }, [oldRound, currentRound]);

  useEffect(() => {
    if (
      oldControlsOrder[0] !== controlsOrder[0] ||
      oldControlsOrder[1] !== controlsOrder[1] ||
      oldControlsOrder[2] !== controlsOrder[2] ||
      oldControlsOrder[3] !== controlsOrder[3]
    ) {
      new Audio(shuffle).play();
    }
  }, [controlsOrder, oldControlsOrder]);

  useEffect(() => {
    // if you have a streak of getting one totally correct, then reveal the powerup
    const revealBonusAudio = new Audio(spellWaves);
    // had to up the volume on spellWaves
    revealBonusAudio.volume = 1;
    correctStreak >= 1 || (correctStreak >= 2 && revealBonusAudio.play());
  }, [correctStreak]);

  return (
    <div className="flex justify-center items-end h-14">
      <button
        onClick={()=>{onClickHandler('shuffle', shuffle, 1)}}
        className={`border-black flex items-center justify-center relative p-0 w-3/4 h-3/4 text-s font-black rounded-xl border-4 hover:cursor-pointer ${
          correctStreak
            ? "border-black bg-white"
            : "border-stone-400 bg-white/20"
        }`}
      >
        Shuffle
      </button>
      <button
        onClick={()=>{onClickHandler('predictor', revealBonus, 1)}}
        className={`border-black flex items-center justify-center relative p-0 w-3/4 h-3/4 text-s font-black rounded-xl border-4 hover:cursor-pointer ${
          correctStreak
            ? "border-black bg-white"
            : "border-stone-400 bg-white/20"
        }`}
      >
        Predictor
      </button>
      <button
        onClick={()=>{onClickHandler('autoLimb', revealBonus, 2)}}
        className={`border-black flex items-center justify-center relative p-0 w-3/4 h-3/4 text-s font-black rounded-xl border-4 hover:cursor-pointer ${
          correctStreak > 1
            ? "border-black bg-white"
            : "border-stone-400 bg-white/20"
        }`}
      >
        Auto Limb
      </button>
    </div>
  );
};

const LimbControls: React.FC<LimbControlsProps> = ({ game }) => {
  const { controlsOrder, autoLimb } = game.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId
  );

  const controlColors: Record<string, string> = {
    "Left Arm": "bg-ronchi",
    "Right Arm": "bg-willpower-orange",
    "Left Leg": "bg-vivid-raspberry",
    "Right Leg": "bg-blue-purple",
  };

  const onClickHandler = (limb: LimbEnum) => {
    new Audio(interfaceClick).play(); /* THIS HAPPENS ONLY ON THE INITIATING PLAYERS DEVICE */
    /* TELLS SERVER TO UPDATE THE LIMB POSE FOR THE ACTIVATING PLAYER - SEE ACTIONS IN LOGIC.TS */
    Rune.actions.toggleLimb({
      limb: limb,
    });
    // console.log(game)
  };

  /* RENDERING OUT THE FOUR LIMB CONTROLS */
  return (
    <div className="flex w-full h-3/4 bg-black border-8 border-black rounded-3xl overflow-clip ">
      {controlsOrder.map((control: string) => {
        const buttonColor = controlColors[control];

        return (
          <button
            key={control}
            className={`relative px-10 py-6 w-full h-full text-xs font-black
              transition-all rounded-none hover:opacity-90 bg-black/10
              ${autoLimb && control === "Left Arm" ? "bg-slate-400" : buttonColor}`}
            onClick={
              autoLimb && control === "Left Arm"
                ? () => {}
                : () => {
                    onClickHandler(
                      LimbEnum[control.replace(/\s+/g, "") as keyof typeof LimbEnum]
                    );
                  }
            }
          >
            <img
              src={`/limb controls/${control} Control.png`}
              className={`absolute top-0 left-0 p-2`}
            />
            {/* {control} */}
          </button>
        );
      })}
    </div>
  );
};

export const Controls: React.FC<ControlsProps> = ({ game, activeCardIndex, setActiveCardIndex }) => {
  /* RENDERING OUT THE BOTTOM CONTROLS INCLUDING THE POWERS UPS, AND LIMB CONTROLS */
  return (
    <div className="flex-col">
      <Powerups game={game} 
	activeCardIndex={activeCardIndex}
	setActiveCardIndex={setActiveCardIndex} />
      <LimbControls game={game} />
    </div>
  );
};
