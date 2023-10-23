export enum LimbEnum {
  LeftArm,
  RightArm,
  LeftLeg,
  RightLeg,
}

export enum PoseEnum {
  Straight,
  BentUp,
  BentDown,
}
export type StageCardProps = {
  activeCardIndex: number;
  color: string;
  leftOffset?: string;
  z?: string;
  active?: boolean;
  limbs: number[];
  shown: boolean;
  index: number;
  rotate?: string;
  attract?: boolean;
  attractActive: boolean;
  game: any;
};

export type PlayerDetailsProps = {
  children?: React.ReactNode;
  showScore?: boolean;
  displayName?: string;
  scoreForRound?: number;
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
  player: Player;
  yourPlayerId?: string;
  activeCardIndex: number;
  controlsColor?: string;
};

export type DanceFloorProps = {
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
  totalScore: number;
  scoreForRound: number;
  index?: number;
  limbs: LimbEnum[];
  correctStreak: number;
  controlsOrder: string[];
  autoLimb: boolean;
  attract: boolean;
  displayName?: string;
  playerPosition?: string;
  win: boolean;
};

export type CardProps = {
  color: string;
  limbs: LimbEnum[];
};

export type DeckProps = {
  game: any;
  activeCardIndex: number;
  player: Player;
};

export interface GameState {
  count: number;
  currentPlayerIndex?: number;
  progress: number;
  remainingTime?: number;
  currentRound: number;
  activeCard: CardProps | null;
  cardStack: CardProps[];
  winner?: string | null;
  players: Player[];
  testNum?: number;
  gameOver: boolean;
  attractActive: boolean;
}

export type GameActions = {
  getStreak?: () => number;
  incrementRoundNumber: () => void;
  resetStreak: () => void;
  shuffleEnemyControls: () => void;
  toggleAutoLimb: (params: { activeCardIndex: number }) => void;
  toggleAttract: () => void;
  toggleLimb: (params: { limb: LimbEnum }) => void;
  setPlayerScoresForRound: () => void;
  setPlayerTotalScore: () => void;
  setPlayerStreak: () => void;
  setWinner: () => void;
  setActiveCard: (params: { activeCardIndex: number }) => void;
  resetShuffledControls: () => void;
  resetAutoLimb: () => void;
  resetAttract: () => void;
};

export type CharacterProps = {
  player: Player;
  displayName?: string;
  yourPlayerId: string;
  currentRound: number;
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
  currentRound: number;
};

export type PowerUpsProps = {
  children?: React.ReactNode;
  game?: any;
  player: Player;
  activeCardIndex: number;
};

export type LimbControlsProps = {
  children?: React.ReactNode;
  game?: any;
  player: Player;
};
