import { Player } from "../types/types";

export const getPlayerState = (game: any, playerId: string) => {
  const player =
    game.players[
      game.players.findIndex((player: Player) => player.playerId === playerId)
    ];
  return player;
};
