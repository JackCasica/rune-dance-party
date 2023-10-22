import { Player } from "../types/types";

export const getWinner = (players: Player[]) => {
  const winner = players.reduce(
    (highestScoringPlayer: Player, currentPlayer: Player) => {
      return currentPlayer.totalScore > highestScoringPlayer.totalScore
        ? currentPlayer
        : highestScoringPlayer;
    },
    players[0],
  );

  return winner;
};
