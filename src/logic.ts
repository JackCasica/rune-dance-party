import type { RuneClient } from "rune-games-sdk/multiplayer";
import { GameState, GameActions, Player, LimbEnum } from "./types/types";
import { generateCardStack } from "./util/generateCardStack";
import { getPlayerState } from "./util/getPlayerState";
import { getWinner } from "./util/getWinner";
declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

const playerColors: string[] = [
  "bg-ronchi",
  "bg-willpower-orange",
  "bg-vivid-raspberry",
  "bg-blue-purple",
];

// const playerPositions: string[] = [
//   "-translate-x-full -translate-y-full fixed ",
//   "-translate-y-full translate-x-0 fixed",
//   "-translate-x-full translate-y-full fixed",
//   "translate-x-0 translate-y-full fixed ",
// ];
const playerPositions: string[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const generatedCardStack = generateCardStack(10);

Rune.initLogic({
  minPlayers: 4,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    return {
      gameOver: false,
      count: 0,
      currentPlayerIndex: 0,
      remainingTime: 60,
      progress: 0,
      currentRound: 1,
      cardStack: generatedCardStack,
      // cardStack: [
      //   { color: "pink", limbs: [1, 3, 1, 2] },
      //   { color: "yellow", limbs: [2, 1, 2, 3] },
      //   { color: "purple", limbs: [3, 1, 2, 2] },
      //   { color: "pink", limbs: [2, 2, 3, 1] },
      //   { color: "yellow", limbs: [2, 3, 1, 1] },
      //   { color: "orange", limbs: [3, 2, 1, 2] },
      //   { color: "yellow", limbs: [2, 2, 2, 3] },
      //   { color: "purple", limbs: [1, 3, 3, 2] },
      //   { color: "orange", limbs: [1, 2, 1, 1] },
      //   { color: "pink", limbs: [2, 1, 3, 2] },
      // ],
      activeCard: generatedCardStack[0],
      winner: null,
      players: playerIds.map((playerId, i) => ({
        key: playerId,
        playerId: playerId,
        playerColor: playerColors[i],
        playerPosition: playerPositions[i],
        limbs: [1, 1, 1, 1],
        controlsOrder: ["Left Arm", "Left Leg", "Right Leg", "Right Arm"],
        scoreForRound: 0,
        totalScore: 0,
        correctStreak: 0,
        autoLimb: false,
        attract: false,
      })),
    };
  },
  actions: {
    /* FIRST ARGUMENT IS A PAYLOAD, USE "_", WHEN PAYLOAD ISNT REQUIRED AND YOU STILL WANT TO ACCESS THE SECOND ARGUMENT. AS A SECOND ARGUMENT, EACH ACTION GETS ACCESS TO AN OBJECT CONTAINING THE CURRENT GAME STATE, THE PLAYER ID OF THE PLAYER INITIATING THE ACTION, AND AN ARRAY OF ALL PLAYER IDS. */

    // THIS ACTIONS INCREMENTS THE CURRENT ROUND IN THE GAME STATE
    incrementRoundNumber: (_, { game }) => {
      game.currentRound++;
    },

    // THIS ACTION UPDATES THE ACTIVE CARD TO THE NEXT CARD IN THE CARDSTACK
    setActiveCard: ({ activeCardIndex }, { game }) => {
      game.activeCard = game.cardStack[activeCardIndex];
    },

    // THIS ACTION SHUFFLES THE ORDER OF THE CONTROLS FOR ALL PLAYERS EXCEPT THE PLAYER WHO INITIATED THE ACTION
    shuffleEnemyControls: (_, { game, playerId: initiatingPlayerId }) => {
      game.players.forEach((player) => {
        if (player.playerId !== initiatingPlayerId) {
          const possibleLimbs = [
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

    // THIS ACTION RESETS THE SHUFFLED CONTROLS FOR ALL PLAYERS
    resetShuffledControls: (_, { game }) => {
      game.players.forEach((player) => {
        player.controlsOrder = [
          "Left Arm",
          "Left Leg",
          "Right Leg",
          "Right Arm",
        ];
      });
    },

    // THIS ACTION RESETS THE AUTO LIMB EFFECT FOR ALL PLAYERS
    resetAutoLimb: (_, { game }) => {
      game.players.forEach((player) => {
        player.autoLimb = false;
      });
    },

    // THIS ACTION RESETS THE ATTRACT EFFECT FOR ALL PLAYERS
    resetAttract: (_, { game }) => {
      game.players.forEach((player) => {
        player.attract = false;
      });
    },

    // THIS ACTION SHOWS THE NEXT CARD FOR THE PLAYER WHO INITIATED THE ACTION
    toggleAttract(_, { game, playerId: initiatingPlayerId }) {
      const initiatingPlayer = getPlayerState(game, initiatingPlayerId);
      initiatingPlayer.attract = true;
    },

    // THIS ACTION SETS A SINGLE LIMB TO THE CORRECT POSITION FOR THE PLAYER WHO INITIATED THE ACTION AND SETS THE AUTO LIMB PROPERTY TO TRUE
    toggleAutoLimb: (
      { activeCardIndex },
      { game, playerId: initiatingPlayerId },
    ) => {
      const initiatingPlayer = getPlayerState(game, initiatingPlayerId);
      initiatingPlayer.autoLimb = true;

      initiatingPlayer.limbs[LimbEnum.LeftArm] =
        game.cardStack[activeCardIndex].limbs[LimbEnum.LeftArm];
    },

    // THIS ACTION SUBTRACTS A PASSED IN COST FROM THE CORRECT STREAK OF THE PLAYER WHO INITIATED THE ACTION
    resetStreak: (_, { game, playerId: initiatingPlayerId }) => {
      const initiatingPlayer = getPlayerState(game, initiatingPlayerId);
      initiatingPlayer.correctStreak = 0;
    },

    // THIS ACTION CHANGES THE POSITION OF THE LIMB FOR THE PLAYER WHO INITIATED THE ACTION
    toggleLimb: ({ limb }, { game, playerId: initiatingPlayerId }) => {
      /* THIS ACTION TAKES A PAYLOAD OBJECT WITH THE LIMB TO BE TOGGLED. EACH LIMB HAS THREE STATES TO TOGGLE BETWEEN */
      const playerIndex = game.players.findIndex(
        (player: Player) => player.playerId === initiatingPlayerId,
      );

      const currentPose = game.players[playerIndex].limbs[limb];
      const newPose = (currentPose % 3) + 1;
      game.players[playerIndex].limbs[limb] = newPose;
    },

    // THIS ACTION CHECKS THE POSES OF EACH PLAYER AGAINST THE FRONTMOST CARD IN THE CARDSTACK, THEN UPDATES THE SCORE PROPERTY FOR EACH PLAYER
    setPlayerScoresForRound: (_, { game }) => {
      game.players.forEach((player) => {
        const scoreForRound = player.limbs.reduce(
          (pointsForRound, limbPose, i) => {
            const poseMatchesCard = limbPose === game.activeCard?.limbs[i];
            return poseMatchesCard ? pointsForRound + 1 : pointsForRound;
          },
          0,
        );

        player.scoreForRound = scoreForRound;
      });
    },
    setPlayerTotalScore: (_, { game, playerId: initiatingPlayerId }) => {
      const player = getPlayerState(game, initiatingPlayerId);
      player.totalScore = player.totalScore + player.scoreForRound;
    },

    // THIS ACTION CHECKS THE PLAYERS SCORE FOR THE ROUND AND INCREMENTS THE CORRECT STREAK PROPERTY IF THE PLAYER SCORED 4 POINTS
    setPlayerStreak: (_, { game, playerId: initiatingPlayerId }) => {
      const player = getPlayerState(game, initiatingPlayerId);
      player.totalScore + player.scoreForRound === player.totalScore + 4
        ? player.correctStreak++
        : (player.correctStreak = 0);
    },

    // THIS ACTIONS SETS THE WINNER PROPERTY OF THE GAME STATE TO THE PLAYER WITH THE HIGHEST SCORE
    setWinner: (_, { game }) => {
      let winner = game.players[0];

      game.players.forEach((player) => {
        if (player.totalScore > winner.totalScore) {
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
  // THIS UPDATE FUNCTION RUNS EVERY 1 SECOND AND UPDATES THE REMAINING TIME PROPERTY OF THE GAME STATE. IF THE REMAINING TIME IS 0, THE GAMEOVER PROPERTY IS SET TO TRUE AND THE WINNER PROPERTY IS SET TO THE PLAYER WITH THE HIGHEST SCORE
  update: ({ game, allPlayerIds }) => {
    game.progress = Rune.gameTimeInSeconds();
    game.remainingTime = 60 - game.progress;

    if (game.remainingTime === 0) {
      game.gameOver = true;

      const winner = getWinner(game.players);

      game.winner = winner.playerId;
      Rune.gameOver({
        players: {
          [game.players[0].playerId]: game.players[0].totalScore,
          [game.players[1].playerId]: game.players[1].totalScore,
          [game.players[2].playerId]: game.players[2].totalScore,
          [game.players[3].playerId]: game.players[3].totalScore,
        },
        delayPopUp: false,
      });
    }
  },
});
