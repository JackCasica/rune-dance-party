import { Player } from "../types/types";

export const getWinners = (players: Player[]) => {
  const highestScore = Math.max(...players.map((player) => player.totalScore));
  const winners = players.filter(
    (player) => player.totalScore === highestScore,
  );

  return winners;
  // const winner = players.reduce(
  //   (highestScoringPlayer: Player, currentPlayer: Player) => {
  //     return currentPlayer.totalScore > highestScoringPlayer.totalScore
  //       ? currentPlayer
  //       : highestScoringPlayer;
  //   },
  //   players[0],
  // );

  // return winner;
};
