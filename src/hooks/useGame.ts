import { useEffect, useState } from "react";

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
};
