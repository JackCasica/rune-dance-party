import { Player } from "./types";
import { PlayerDetails } from "./../components/PlayerDetails";
import { ActiveCard } from "./../components/ActiveCard";
import { Card } from "./../components/Card";

// export type Limb = "left arm" | "right arm" | "left leg" | "right leg";
export enum LimbEnum {
  LeftArm,
  RightArm,
  LeftLeg,
  RightLeg,
}

export type StageCardProps = {
  color: string;
  leftOffset?: string;
  z?: string;
  active?: boolean;
  limbs: number[];
  shown: boolean;
};

export type PlayerDetailsProps = {
  children?: React.ReactNode;
  player?: Player;
  showScore?: boolean;
};

export type ActiveCardProps = {
  activeCard: CardProps | null;
};

export type StageContainerProps = {
  children?: React.ReactNode;
  game?: any;
};

export type ControlsProps = {
  children?: React.ReactNode;
  game?: any;
  playerId?: string;
  player?: Player;
  yourPlayerId?: string;
  activeCardIndex: number;
};

export type DanceFloorProps = {
  children?: React.ReactNode;
  game?: GameState; // Replace 'any' with the actual type of your game state
};

export type RoundTimerProps = {
  turnCard: Function;
  game: any;
  activeCardIndex: number;
};

export type StageProps = {
  children?: React.ReactNode;
  game: any;
  activeCardIndex: number;
  setActiveCardIndex: Function;
};

export type TimerProps = {
  children?: React.ReactNode;
  game: any; // Replace 'any' with the actual type of your game state
};

export enum LimbPose {
  Straight = 1,
  BentUp = 2,
  BentDown = 3,
}

export type Player = {
  playerId: string;
  playerColor: string;
  score: number;
  scoreForRound: number;
  index?: number;
  limbs: LimbEnum[];
  correctStreak: number;
  controlsOrder: string[];
  autoLimb: boolean;
  predictor: boolean;
};

export type CardProps = {
  color: string;
  limbs: LimbEnum[];
};

export type CardsProps = {
  children?: React.ReactNode;
};

export interface GameState {
  count: number;
  currentPlayerIndex?: number;
  remainingTime?: number;
  currentRound: number;
  activeCard: CardProps | null;
  cardStack: CardProps[];
  winner?: string | null;
  players: Player[];
  testNum?: number;
  gameOver: boolean;
}

export type GameActions = {
  getStreak?: () => number;
  incrementRoundNumber: () => void;
  subtractStreak: (cost: number) => void;
  updateActiveCard: (index: number) => void;
  shuffleEnemyControls: () => void;
  toggleAutoLimb: (params: { isActive: boolean; index?: number }) => void;
  togglePredictor: (params: { isActive: boolean }) => void;
  toggleLimb: (params: { limb: LimbEnum }) => void;
  checkPlayerPoses: (params: { index: number }) => void;
  setWinner: () => void;
};

export type CharacterProps = {
  player: Player;
  playerName: string;
  yourPlayerId: string;
};

export type LimbProps = {
  limb: LimbEnum;
  limbPoses?: {
    leftArm: number;
    rightArm: number;
    leftLeg: number;
    rightLeg: number;
  };
  player: Player;
};

export type BodyProps = {
  children: React.ReactElement<LimbProps>[] | React.ReactElement<LimbProps>;
  player: Player;
};

export type PowerUpsProps = {
  children?: React.ReactNode;
  game?: any;
  player?: Player;
  activeCardIndex: number;
};

export type LimbControlsProps = {
  children?: React.ReactNode;
  game?: any;
};
