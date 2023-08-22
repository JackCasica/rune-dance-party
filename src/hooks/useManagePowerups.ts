import { useEffect } from "react";

export const useManagePowerups = (game) => {
	const { currentRound: oldRound } = game.oldGame;
	const { currentRound } = game.newGame;

	useEffect(() => {
		// activates at round turnover, turns off powerups
		if (oldRound !== currentRound) {
			Rune.actions.toggleAutoLimb({ isActive: false });
			Rune.actions.togglePredictor({ isActive: false });
		}
	}, [oldRound, currentRound]);

	return null;
};
