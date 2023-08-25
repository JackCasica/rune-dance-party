import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { Stage } from "./components/Stage";
import { useGame } from "./hooks/useGame.ts";

import type { Player } from "./types/types.ts";
import { useState, useEffect } from "react";
import purpleSoda from "./assets/purple-soda.mp3";
import { playSound } from "./util/playSound.ts";
import gameOverSound from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
const backgroundMusic = new Audio(purpleSoda);
backgroundMusic.volume = 0.1;

function App() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  /* THIS IS THE GAME DATA FROM SERVER. PASS THIS TO COMPONENTS THAT NEED GAME STATE DATA, ETC */
  const game = useGame();

  useEffect(() => {
    const playMusicOnce = () => {
      backgroundMusic.play();
      window.removeEventListener("click", playMusicOnce);
      window.removeEventListener("touchstart", playMusicOnce);
    };

    window.addEventListener("click", playMusicOnce);
    window.addEventListener("touchstart", playMusicOnce);

    return () => {
      window.removeEventListener("click", playMusicOnce);
      window.removeEventListener("touchstart", playMusicOnce);
    };
  }, []);

  if (game?.gameOver) {
    backgroundMusic.pause();
    game.newGame.winner === game.yourPlayerId
      ? playSound(gameOverSound)
      : playSound(lose);
  }

  /* RENDERING OUT GAME UI IF THE GAME IS READY */
  return (
    <>
      {game ? (
        <main className="flex h-screen w-full flex-col justify-between gap-4 bg-brilliant-azure p-4">
          <Stage
            game={game}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
          />
          <DanceFloor game={game}>
            {game.newGame.players.map((player: Player) => (
              <Character
                key={player.playerId}
                playerName={game.players[player.playerId].displayName}
                player={player}
                yourPlayerId={game.yourPlayerId}
              />
            ))}
          </DanceFloor>
          <Controls game={game} activeCardIndex={activeCardIndex} />
        </main>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
