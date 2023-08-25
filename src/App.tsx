import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { Stage } from "./components/Stage";
import { useGame } from "./hooks/useGame.ts";

import type { Player } from "./types/types.ts";
import { useState } from "react";
import purpleSoda from "./assets/purple-soda.mp3";
import { playSound } from "./util/playSound.ts";
import gameOverSound from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
const backgroundMusic = new Audio(purpleSoda);
backgroundMusic.volume = 0.1;
backgroundMusic.play();

function App() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  /* THIS IS THE GAME DATA FROM SERVER. PASS THIS TO COMPONENTS THAT NEED GAME STATE DATA, ETC */
  const game = useGame();

  /* GUARD CLAUSE PREVENTS RENDERING OUT GAME UI IF GAME ISN'T READY */
  if (!game) {
    return;
  }

  if (game.newGame.remainingTime === 0) {
    backgroundMusic.pause();

    if (game.newGame.winner === game.yourPlayerId) {
      playSound(gameOverSound);
    } else {
      playSound(lose);
    }
  }

  /* RENDERING OUT GAME UI IF THE GAME IS READY */
  return (
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
  );
}

export default App;
