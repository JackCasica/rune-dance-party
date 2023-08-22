import React, { useEffect, useState } from "react";

import { Card, Player, StageProps } from "../types/types";
import { RoundTimer } from "./RoundTimer";
import { StageCard } from "./StageCard";

export const Stage: React.FC<StageProps> = ({ game, activeCardIndex, setActiveCardIndex }) => {
	const [stageCards, setStageCards] = useState<Card[]>(game.newGame.cardStack.slice(1));
	const [activeCard, setActiveCard] = useState<Card>(game.newGame.cardStack[0]);
	const { predictor } = game.newGame.players.find((player: Player) => player.playerId === game.yourPlayerId);
	// const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

	useEffect(() => {
		Rune.actions.updateActiveCard(0);
	}, []);

	const turnCard = () => {
		if (stageCards.length > 0) {
			// WHEN THE ROUND ENDS, SCORE THE PREVIOUS CARD'S POSES
			// Rune.actions.checkPlayerPoses({ index: activeCardIndex });
			// THEN TURN TO THE NEW CARD (this triggers the useEffect below)
			// Rune.actions.updateActiveCard(activeCardIndex + 1)
			setActiveCardIndex((prev: number) => prev + 1);
		}
	};

	useEffect(() => {
		// TRIGGERED BY THE ACTIVE CARD INDEX CHANGING (skips initial render tho)
		if (activeCardIndex > 0) {
			setActiveCard(stageCards[0]);
			setStageCards((prev) => prev.slice(1));
		}
	}, [activeCardIndex]);

	return (
		<div
			id="stage"
			className="flex flex-col w-full pt-4 px-4 bg-orange-500 border-4 border-orange-700 border-solid rounded-xl h-fit"
		>
			<div
				id="cards"
				className="flex"
			>
				<div
					id="active-card"
					className={`mr-10 w-10 h-14 ${activeCard || "border-4 border-white border-dashed rounded-xl"}`}
					style={{ width: "20vw", height: "25vw" }}
				>
					{activeCard ? (
						<StageCard
							active={true}
							color={activeCard.color}
							limbs={activeCard.limbs}
							shown={true}
						/>
					) : (
						<> </>
					)}
				</div>
				<div
					id="deck"
					className="relative flex" // ... like me
				>
					{stageCards.map((cardItem: Card, i: number) => (
						<div key={`stage-cards-${i}`}>
							<StageCard
								color={cardItem.color}
								leftOffset={`${i * 10 + 2}px`}
								z={`${stageCards.length - i}`}
								limbs={cardItem.limbs}
								shown={predictor}
							/>
						</div>
					))}
				</div>
			</div>
			<div id="round-timer">
				<RoundTimer
					game={game}
					turnCard={turnCard}
					activeCardIndex={activeCardIndex}
				/>
			</div>
		</div>
	);
};
