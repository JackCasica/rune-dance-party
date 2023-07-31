import type { RuneClient } from "rune-games-sdk/multiplayer";
import type { GameState, GameActions, Player } from "./types/types";
import { generateCardStack } from "./util/generateCardStack.ts";
import gameOverSound from './assets/game over.wav'

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getCount(game: GameState) {
  return game.count;
}

Rune.initLogic({
  minPlayers: 4 /* TEMPORARILY SET TO SHOW AUTOMATICALLY SHOW 4 DEVICES DURING DEVELOPMENT, BUT WILL ULTIMATELY SET TO 1 */,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    return {
      count: 0,
      currentPlayerIndex: 0,
      remainingTime: 60,
      cardStack: generateCardStack(10),
      winner: null,
      players: playerIds.map((playerId, index) => ({
        key: playerId,
        playerId: playerId,
        limbs: [1, 1, 1, 1],
        score: 0,
        displayName: `Player ${index + 1}`,
      })),
    };
  },
  actions: {
    /* AS A SECOND ARGUMENT, EACH ACTION GETS ACCESS TO AN OBJECT CONTAINING THE CURRENT GAME STATE, THE PLAYER ID OF THE PLAYER INITIATING THE ACTION, AND AN ARRAY OF ALL PLAYER IDS. */
    updateCardStack: (_, { game }) => {
      /* A FUNCTION FOR REMOVING THE TOPMOST CARD FROM THE STACK */
      game.cardStack.shift();
    },

    toggleLimb: ({ limb }, { game, playerId: initiatingPlayerId }) => {
      /* THIS ACTION TAKES A PAYLOAD OBJECT WITH THE LIMB TO BE TOGGLED. EACH LIMB HAS THREE STATES TO TOGGLE BETWEEN */
      const playerIndex = game.players.findIndex(
        (player: Player) => player.playerId === initiatingPlayerId
      );
      const currentPose = game.players[playerIndex].limbs[limb];
      const newPose = (currentPose % 3) + 1;
      game.players[playerIndex].limbs[limb] = newPose;
    },

    checkPlayerPoses: ({ index }, { game, playerId: initiatingPlayerId }) => {
      /* COMPARE LIMBS OF EACH PLAYER AGAINST FRONTMOST CARD IN CARDSTACK, THEN UPDATES SCORE PROPERTY FOR EACH PLAYER */
      const playerIndex = game.players.findIndex(
        (player: Player) => player.playerId === initiatingPlayerId
      );
      const player = game.players[playerIndex]
      const activeCard = game.cardStack[index]
      const playerLimbPoses = player.limbs;

      const score = playerLimbPoses.reduce((acc, limbPose, i) => {
        if (limbPose === activeCard.limbs[i]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      player.score = player.score + score;
    },
  },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
  update: ({ game }) => {
    /* THIS UPDATE FUNCTION RUNS EVERY 1 SECOND */
    /* GAME OVER AFTER 60 SECONDS */
    const timeElapsed = Rune.gameTimeInSeconds();
    game.remainingTime = 60 - timeElapsed;
    if (game.remainingTime === 0) {
      new Audio(gameOverSound).play()
      Rune.gameOver({
        players: {
          [game.players[0].playerId]: game.players[0].score,
          [game.players[1].playerId]: game.players[1].score,
          [game.players[2].playerId]: game.players[2].score,
          [game.players[3].playerId]: game.players[3].score,
        },
        delayPopUp: false,
      });
    }
  },
});
