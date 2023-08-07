import React, { useEffect, useState } from "react";

import interfaceClick from "../assets/interface click.wav";

import type { ControlsProps, LimbControlsProps, PowerUpsProps, Player } from "../types/types";
import { LimbEnum } from "../types/types";

const Powerups: React.FC<PowerUpsProps> = ({ game }) => {
	const { correctStreak } = game.newGame.players.find((player: Player) => player.playerId === game.yourPlayerId);

	// const [streak, setStreak] = useState<number>(
	// 	game.newGame.players.find((player: Player) => player.playerId === game.yourPlayerId)?.correctStreak
	// );

	// useEffect(() => {
	// 	setStreak(correctStreak);
	// }, [correctStreak]);

	const onClickHandler = () => {
		correctStreak >= 1 && Rune.actions.shuffleEnemyControls();
	};

	return (
		<div className="flex justify-center items-end h-14">
			<button
				onClick={onClickHandler}
				className={`border-black flex items-center justify-center relative w-3/4 h-3/4 text-s font-black bg-white/20 rounded-xl border-4 hover:cursor-pointer ${
					correctStreak ? "border-black" : "border-stone-400"
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
						className={`w-full h-full text-xs font-black transition-all rounded-none hover:opacity-90 bg-black/10 ${buttonColor} `}
						onClick={() => onClickHandler(LimbEnum[control.replace(/\s+/g, "") as keyof typeof LimbEnum])}
					>
						{control}
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
