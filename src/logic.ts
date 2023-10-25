import { RuneClient } from "rune-games-sdk";

import { GameActions, GameState, LimbEnum } from "./types/types";
import { generateCardStack } from "./util/generateCardStack";
import { getPlayerState } from "./util/getPlayerState";
import { getWinners } from "./util/getWinner";

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

const playerColors: string[] = [
  "bg-ronchi",
  "bg-willpower-orange",
  "bg-vivid-raspberry",
  "bg-blue-purple",
];

const attractedCardPositions: string[] = [
  "fixed left-0 top-0 h-[20vw] w-[16vw] ",
  "fixed right-0 top-0 h-[20vw] w-[16vw] ",
  "fixed left-0 bottom-[27%] h-[20vw] w-[16vw] ",
  "fixed right-0 bottom-[27%] h-[20vw] w-[16vw] ",
];

const generatedCardStack = generateCardStack(10);

Rune.initLogic({
  updatesPerSecond: 30,
  minPlayers: 4,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    return {
      gameOver: false,
      testActionTriggered: false,
      count: 0,
      currentPlayerIndex: 0,
      remainingTime: 60,
      progress: 0,
      currentRound: 1,
      cardStack: generatedCardStack,
      attractActive: false,
      activeCard: generatedCardStack[0],
      activeCardIndex: 0,
      roundOver: false,
      winner: null,
      timeInSeconds: 0,
      players: playerIds.map((playerId, i) => ({
        key: playerId,
        playerId: playerId,
        playerColor: playerColors[i],
        attractedCardPosition: attractedCardPositions[i],
        limbs: [1, 1, 1, 1],
        controlsOrder: ["Left Arm", "Left Leg", "Right Leg", "Right Arm"],
        scoreForRound: 0,
        totalScore: 0,
        correctStreak: 0,
        autoLimb: false,
        attract: false,
        win: false,
      })),
    };
  },
  actions: {
    /* FIRST ARGUMENT IS A PAYLOAD, USE "_", WHEN PAYLOAD ISNT REQUIRED AND YOU STILL WANT TO ACCESS THE SECOND ARGUMENT. AS A SECOND ARGUMENT, EACH ACTION GETS ACCESS TO AN OBJECT CONTAINING THE CURRENT GAME STATE, THE PLAYER ID OF THE PLAYER INITIATING THE ACTION, AND AN ARRAY OF ALL PLAYER IDS. */

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

    // THIS ACTION ATTRACTS THE CARD TO THE PLAYER WHO INITIATED THE ACTION. IT CAN OVERRIDE EXISTING ATTRACT EFFECTS ON OTHER PLAYERS
    toggleAttract(_, { game, playerId: initiatingPlayerId }) {
      game.players.forEach((player) => {
        player.attract = false;
      });

      const initiatingPlayer = getPlayerState(game, initiatingPlayerId);
      initiatingPlayer.attract = true;
      game.attractActive = true;
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
      const player = getPlayerState(game, initiatingPlayerId);
      player.limbs[limb] = (player.limbs[limb] % 3) + 1;
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
  update: ({ game }) => {
    game.progress = Rune.gameTime();
    game.remainingTime = 60000 - game.progress;
    game.gameOver = game.remainingTime <= 0;
    const newTimeInSeconds = Math.floor(game.progress / 1000);

    game.roundOver =
      newTimeInSeconds !== 0 &&
      newTimeInSeconds % 6 === 0 &&
      newTimeInSeconds !== game.timeInSeconds &&
      game.progress > 0;

    const roundCleanup = () => {
      game.players.forEach((player) => {
        player.scoreForRound = player.limbs.reduce(
          (totalPointsForRound, limbPose, i) => {
            const poseMatchesCard =
              limbPose === game.cardStack[game.activeCardIndex]?.limbs[i];
            return poseMatchesCard
              ? totalPointsForRound + 1
              : totalPointsForRound;
          },
          0,
        );
        player.totalScore = player.totalScore + player.scoreForRound;
        player.totalScore + player.scoreForRound === player.totalScore + 4
          ? player.correctStreak++
          : (player.correctStreak = 0);
        player.autoLimb = false;
        player.attract = false;
        game.attractActive = false;
        player.controlsOrder = [
          "Left Arm",
          "Left Leg",
          "Right Leg",
          "Right Arm",
        ];
      });
      game.currentRound++;
      game.activeCardIndex++;
      game.activeCard = game.cardStack[game.activeCardIndex];
    };

    if (game.roundOver) {
      console.log("🔴", game.progress);
      roundCleanup();
    }

    if (game.progress === 59) {
      roundCleanup();
    }

    if (game.gameOver) {
      const winners = getWinners(game.players);
      winners.forEach((winner) => {
        winner.win = true;
      });

      Rune.gameOver({
        players: game.players.reduce(
          (acc, player) => ({ ...acc, [player.playerId]: player.totalScore }),
          {},
        ),
        delayPopUp: false,
      });
    }

    game.timeInSeconds = newTimeInSeconds;
  },
});
