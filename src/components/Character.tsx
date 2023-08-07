import React from "react";

import { BodyProps, CharacterProps, LimbEnum, LimbProps } from "../types/types";

import "../index.css";

const Limb: React.FC<LimbProps> = ({ limb, player }) => {
	let position;
	let limbType;

	switch (limb) {
		case LimbEnum.LeftArm:
			position = "left-0 top-1/4 -translate-x-[85%]";
			limbType = "LeftArm";
			break;
		case LimbEnum.RightArm:
			position = "right-0 top-1/4 translate-x-[85%]";
			limbType = "RightArm";

			break;
		case LimbEnum.LeftLeg:
			position = "left-0 bottom-0 translate-y-[85%] -translate-x-[10%]";
			limbType = "LeftLeg";

			break;
		case LimbEnum.RightLeg:
			position = "right-0 bottom-0 translate-y-[85%] translate-x-[10%]";
			limbType = "RightLeg";
			break;
		default:
			position = "left-0 top-1/4";
			break;
	}

	return (
		<div className={`absolute font-black text-xs ${position} w-3/4 aspect-square`}>
			{/* {player.limbs[limb]} */}
			<img
				src={`/limbs/${limbType}Pose=0.png`}
				className={`absolute ${player.limbs[limb] === 1 ? "opacity-100" : "opacity-0"}`}
			/>
			<img
				src={`/limbs/${limbType}Pose=1.png`}
				className={`absolute ${player.limbs[limb] === 2 ? "opacity-100" : "opacity-0"}`}
			/>
			<img
				src={`/limbs/${limbType}Pose=2.png`}
				className={`absolute ${player.limbs[limb] === 3 ? "opacity-100" : "opacity-0"}`}
			/>
		</div>
	);
};

const Body: React.FC<BodyProps> = ({ children, player }) => {
	return (
		<div className="relative flex items-center w-1/2 justify-center  rounded-full bg-black/0">
			<img
				src="/limbs/torso.png"
				className=""
			/>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { player: player });
				}
				return child;
			})}
		</div>
	);
};

export const Character: React.FC<CharacterProps> = ({ playerName, player }) => {
	return (
		<div className="relative flex flex-col items-center w-full p-4 bg-black/0 rounded-3xl aspect-square">
			<span>{playerName}</span>
			<span className="absolute top-0 right-0 font-black stroke-text">{player.score}</span>
			<Body player={player}>
				<Limb
					limb={LimbEnum.LeftArm}
					player={player}
				/>
				<Limb
					limb={LimbEnum.RightArm}
					player={player}
				/>
				<Limb
					limb={LimbEnum.LeftLeg}
					player={player}
				/>
				<Limb
					limb={LimbEnum.RightLeg}
					player={player}
				/>
			</Body>
		</div>
	);
};
