import { useEffect, useState } from "react";

// import { GameState } from "../logic.ts";

/* CUSTOM HOOK SUBCRIBE TO GAME STATE CHANGES ON SERVER */
export const useGame = (): any => {
    // State variable for game data
    const [gameData, setGameData] = useState<any>();

    // INITIALIZE RUNE CLIENT ON COMPONENT MOUNT
    useEffect(() => {
        Rune.initClient({
            /* UPDATE GAME STATE DATA ON GAME STATE CHANGE */
            onChange: (gameData) => {
                setGameData(gameData);
            },
        });
    }, []); /* RUN ONCE ON MOUNT */

    // Return current game state
    return gameData;

    /*
{
    event: {event: 'stateSync'},
    newGame: {
        cardStack: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        count: 0
        currentPlayerIndex: 0
        players: (4) [{…}, {…}, {…}, {…}]
        remainingTime: 60
        testNum: 0
        winner: null
        [[Prototype]]: Object
    },
    oldGame: {
        cardStack: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        count: 0
        currentPlayerIndex: 0
        players: {
            0: {
                controls: {
                    0: "Left Arm",
                    1: "Right Arm",
                    2: "Left Leg",
                    3: "Right Leg"
                }, 
                correctStreak: 0, 
             
                key: 'ef2fd546-1713-40ac-b1e6-f4a82da79776', 
                limbs: [1,1,1,1],
                playerId: 'ef2fd546-1713-40ac-b1e6-f4a82da79776',
                score: 0
            }
            1: {controls: Array(4), correctStreak: 0, key: '5c45a6b9-39d4-4423-b532-83093725b7e2', limbs: Array(4), …}
            2: {controls: Array(4), correctStreak: 0, key: '3643626c-125c-4d6d-ad1e-39dc4a7bef52', limbs: Array(4), …}
            3: {controls: Array(4), correctStreak: 0, key: '6124c10a-0d94-4e8c-9085-7802caa5a94f', limbs: Array(4), …}
        }
        remainingTime: 60
        testNum: 0
        winner: null
        [[Prototype]]: Object
    },
    players: {
        5c45a6b9-39d4-4423-b532-83093725b7e2: {avatarUrl: 'https://app.rune.ai/avatar?base=6&hair=40&tilt=1&h…16&size=420&isCropped=1&isBackgroundTransparent=0', displayName: 'Luigi', playerId: '5c45a6b9-39d4-4423-b532-83093725b7e2'}
        6124c10a-0d94-4e8c-9085-7802caa5a94f: {avatarUrl: 'https://app.rune.ai/avatar?base=3&hair=51&tilt=0&h…17&size=420&isCropped=1&isBackgroundTransparent=0', displayName: 'Niko Bellic', playerId: '6124c10a-0d94-4e8c-9085-7802caa5a94f'}
        3643626c-125c-4d6d-ad1e-39dc4a7bef52: {avatarUrl: 'https://app.rune.ai/avatar?base=8&hair=46&tilt=0&h…17&size=420&isCropped=1&isBackgroundTransparent=0', displayName: 'Little Sister', playerId: '3643626c-125c-4d6d-ad1e-39dc4a7bef52'}
        ef2fd546-1713-40ac-b1e6-f4a82da79776: {avatarUrl: 'https://app.rune.ai/avatar?base=7&hair=33&tilt=0&h…15&size=420&isCropped=1&isBackgroundTransparent=0', displayName: 'Peach', playerId: 'ef2fd546-1713-40ac-b1e6-f4a82da79776'}
        [[Prototype]]: Object
    },
    yourPlayerId: "0dcd44d8-2c14-4868-be87-6bf65df3d349"
}
*/
};
