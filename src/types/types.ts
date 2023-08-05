// export type Limb = "left arm" | "right arm" | "left leg" | "right leg";
export enum LimbEnum {
    LeftArm,
    RightArm,
    LeftLeg,
    RightLeg,
}

export type ControlsProps = {
    children?: React.ReactNode;
    game?: any;
    playerId?: string;
    player?: Player;

};

export type DanceFloorProps = {
    children?: React.ReactNode;
    game?: GameState; // Replace 'any' with the actual type of your game state
};

export type RoundTimerProps = {
    turnCard: Function;
    game: any;
    activeCardIndex: number;
}

export type StageProps = {
    children?: React.ReactNode;
    game: any;
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
    score: number;
    index?: number;
    limbs: LimbEnum[];
    correctStreak: number;
    controls: string[];
    displayName: string;
};

export type Card = {
    color: string;
    limbs: LimbEnum[];
};

export interface GameState {
    count: number;
    currentPlayerIndex?: number;
    remainingTime?: number;
    cardStack: Card[];
    winner?: string | null;
    players: Player[];
    testNum?: number;
}

export type GameActions = {
    testFunction: () => number;
    getStreak: () => number;
    shuffleControls: () => void;
    toggleLimb: (params: { limb: LimbEnum }) => void;
    checkPlayerPoses: (params: { index: number }) => void;
};

export type CharacterProps = {
    player: Player;
    playerName: string;
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
