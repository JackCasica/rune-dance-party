import React, { useEffect, useState } from "react";

import interfaceClick from "../assets/interface click.wav";
import revealBonus from "../assets/reveal bonus.wav";
import spellWaves from "../assets/spell waves.wav";
import shuffle from "../assets/shuffle.wav";

import type { ControlsProps, LimbControlsProps, PowerUpsProps, Player } from "../types/types";
import { LimbEnum } from "../types/types";

const Powerups: React.FC<PowerUpsProps> = ({ game }) => {
	const { controlsOrder: oldControlsOrder } = game.oldGame.players.find((player: Player) => player.playerId === game.yourPlayerId);
	const { correctStreak, controlsOrder } = game.newGame.players.find((player: Player) => player.playerId === game.yourPlayerId);

	const onClickHandler = () => {
    // if you clicked this button and you have enough of a streak, play shuffle sound to yourself
    correctStreak >= 1 && new Audio(revealBonus).play()
		correctStreak >= 1 && Rune.actions.shuffleEnemyControls();
	};

  useEffect(()=>{
    if (oldControlsOrder[0] !== controlsOrder[0] 
      || oldControlsOrder[1] !== controlsOrder[1]
      || oldControlsOrder[2] !== controlsOrder[2]
      || oldControlsOrder[3] !== controlsOrder[3]
      ){
        new Audio(shuffle).play()
        console.log('play shuffle sound')
    }
  }, [controlsOrder, oldControlsOrder])

  useEffect(()=>{
    // if you have a streak of getting one totally correct, then reveal the powerup
    const revealBonusAudio = new Audio(spellWaves)
    // had to up the volume on spellWaves
    revealBonusAudio.volume = 1
    correctStreak >= 1 && revealBonusAudio.play()
  },[correctStreak])

	return (
		<div className="flex justify-center items-end h-14">
			<button
				onClick={onClickHandler}
				className={`border-black flex items-center justify-center relative w-3/4 h-3/4 text-s font-black  rounded-xl border-4 hover:cursor-pointer ${
					correctStreak ? "border-black bg-white" : "border-stone-400 bg-white/20"
				}`}
			>
				Shuffle Opponent Cards
			</button>
		</div>
	);
};

const LimbControls: React.FC<LimbControlsProps> = ({ game }) => {
	const { controlsOrder } = game.newGame.players.find((player: Player) => player.playerId === game.yourPlayerId);
	// const controlsOrder = game.newGame.players[game.newGame.currentPlayerIndex].controlsOrder;

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
	};

	/* RENDERING OUT THE FOUR LIMB CONTROLS */
	return (
		<div className="flex w-full h-3/4 bg-black border-8 border-black rounded-3xl overflow-clip ">
			{controlsOrder.map((control: string) => {
				const buttonColor = controlColors[control];

				return (
					<button
						key={control}
						className={`relative px-10 py-6 w-full h-full text-xs font-black transition-all rounded-none hover:opacity-90 bg-black/10 ${buttonColor} `}
						onClick={() => onClickHandler(LimbEnum[control.replace(/\s+/g, "") as keyof typeof LimbEnum])}
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

export const Controls: React.FC<ControlsProps> = ({ game }) => {
	/* RENDERING OUT THE BOTTOM CONTROLS INCLUDING THE POWERS UPS, AND LIMB CONTROLS */
	return (
		<div className="flex-col">
			<Powerups game={game} />
			<LimbControls game={game} />
		</div>
	);
};
