import type { RuneClient } from "rune-games-sdk/multiplayer";
import { GameState, GameActions, Player, LimbEnum } from "./types/types";
import { generateCardStack } from "./util/generateCardStack.ts";
import gameOverSound from "./assets/game-over.wav";
import { playSound } from "./util/playSound.ts";
import purpleSoda from "./assets/purple-soda.mp3";

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

const playerColors: string[] = ["pink", "purple", "orange", "yellow"];

Rune.initLogic({
  minPlayers: 4 /* TEMPORARILY SET TO SHOW AUTOMATICALLY SHOW 4 DEVICES DURING 
  DEVELOPMENT, BUT WILL ULTIMATELY SET TO 1 */,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    return {
      count: 0,
      currentPlayerIndex: 0,
      remainingTime: 60,
      currentRound: 1,
      // cardStack: generateCardStack(10),
      cardStack: [
        { color: "pink", limbs: [1, 3, 1, 2] },
        { color: "yellow", limbs: [2, 1, 2, 3] },
        { color: "purple", limbs: [3, 1, 2, 2] },
        { color: "pink", limbs: [2, 2, 3, 1] },
        { color: "yellow", limbs: [2, 3, 1, 1] },
        { color: "orange", limbs: [3, 2, 1, 2] },
        { color: "yellow", limbs: [2, 2, 2, 3] },
        { color: "purple", limbs: [1, 3, 3, 2] },
        { color: "orange", limbs: [1, 2, 1, 1] },
        { color: "pink", limbs: [2, 1, 3, 2] },
      ],
      activeCard: null,
      winner: null,
      players: playerIds.map((playerId, i) => ({
        key: playerId,
        playerId: playerId,
        playerColor: playerColors[i],
        limbs: [1, 1, 1, 1],
        controlsOrder: ["Left Arm", "Right Arm", "Left Leg", "Right Leg"],
        scoreForRound: 0,
        score: 0,
        correctStreak: 0,
        autoLimb: false,
        predictor: false,
      })),
    };
  },
  actions: {
    /* FIRST ARGUMENT IS A PAYLOAD, USE "_", WHEN PAYLOAD ISNT REQUIRED AND YOU STILL WANT TO ACCESS THE SECOND ARGUMENT. AS A SECOND ARGUMENT, EACH ACTION GETS ACCESS TO AN OBJECT CONTAINING THE CURRENT GAME STATE, THE PLAYER ID OF THE PLAYER INITIATING THE ACTION, AND AN ARRAY OF ALL PLAYER IDS. */
    incrementRoundNumber: (_, { game }) => {
      game.currentRound++;
    },

    updateActiveCard: (index, { game }) => {
      game.activeCard = game.cardStack[index];
    },

    shuffleEnemyControls: (_, { game, playerId: initiatingPlayerId }) => {
      // THIS ACTION SHUFFLES THE ORDER OF THE CONTROLS FOR ALL PLAYERS EXCEPT THE PLAYER WHO INITIATED THE ACTION
      game.players.forEach((player) => {
        if (player.playerId !== initiatingPlayerId) {
          let possibleLimbs = [
            "Right Arm",
            "Left Leg",
            "Left Arm",
            "Right Leg",
          ];
          for (let i = 2; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [possibleLimbs[i], possibleLimbs[j]] = [
              possibleLimbs[j],
              possibleLimbs[i],
            ];
          }
          player.controlsOrder = possibleLimbs;
        }
      });
    },

    togglePredictor({ isActive }, { game, playerId: initiatingPlayerId }) {
      const initiatingPlayer =
        game.players[
          game.players.findIndex(
            (player: Player) => player.playerId === initiatingPlayerId,
          )
        ];
      initiatingPlayer.predictor = isActive;
    },

    toggleAutoLimb: (
      { isActive, index },
      { game, playerId: initiatingPlayerId },
    ) => {
      const initiatingPlayer =
        game.players[
          game.players.findIndex(
            (player: Player) => player.playerId === initiatingPlayerId,
          )
        ];
      initiatingPlayer.autoLimb = isActive;

      if (isActive === true && index) {
        initiatingPlayer.limbs[LimbEnum.LeftArm] =
          game.cardStack[index].limbs[0];
      }
    },

    subtractStreak: (cost, { game, playerId: initiatingPlayerId }) => {
      const initiatingPlayer =
        game.players[
          game.players.findIndex(
            (player: Player) => player.playerId === initiatingPlayerId,
          )
        ];
      initiatingPlayer.correctStreak -= cost;
    },

    toggleLimb: ({ limb }, { game, playerId: initiatingPlayerId }) => {
      /* THIS ACTION TAKES A PAYLOAD OBJECT WITH THE LIMB TO BE TOGGLED. EACH LIMB HAS THREE STATES TO TOGGLE BETWEEN */
      const playerIndex = game.players.findIndex(
        (player: Player) => player.playerId === initiatingPlayerId,
      );

      const currentPose = game.players[playerIndex].limbs[limb];
      const newPose = (currentPose % 3) + 1;
      game.players[playerIndex].limbs[limb] = newPose;
    },

    checkPlayerPoses: ({ index }, { game, playerId: initiatingPlayerId }) => {
      /* COMPARE LIMBS OF EACH PLAYER AGAINST FRONTMOST CARD IN CARDSTACK, THEN UPDATES SCORE PROPERTY FOR EACH PLAYER */
      const playerIndex = game.players.findIndex(
        (player: Player) => player.playerId === initiatingPlayerId,
      );
      const player = game.players[playerIndex];
      const playerLimbPoses = player.limbs;

      const scoreForRound = playerLimbPoses.reduce((acc, limbPose, i) => {
        if (limbPose === game.cardStack[index].limbs[i]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      // if the player got a perfect score this round, increase streak by 1 else reset to 0
      // player.score + score == player.score + 4 && player.correctStreak++;
      player.scoreForRound = scoreForRound;
      player.score + scoreForRound == player.score + 4
        ? player.correctStreak++
        : (player.correctStreak = 0);
      player.score = player.score + scoreForRound;
    },
    setWinner: (_, { game }) => {
      let winner = game.players[0];
      game.players.forEach((player) => {
        if (player.score > winner.score) {
          winner = player;
        }
      });
      game.winner = winner.playerId;
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
  update: ({ game, allPlayerIds }) => {
    /* THIS UPDATE FUNCTION RUNS EVERY 1 SECOND */
    const timeElapsed = Rune.gameTimeInSeconds();
    game.remainingTime = 60 - timeElapsed;
    if (game.remainingTime === 0) {
      let winner = game.players[0];
      game.players.forEach((player) => {
        if (player.score > winner.score) {
          winner = player;
        }
      });
      game.winner = winner.playerId;
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
