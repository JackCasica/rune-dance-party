import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { Deck } from "./components/Deck.tsx";
import { useGame } from "./hooks/useGame.ts";

import type { Player } from "./types/types.ts";
import { useEffect } from "react";
import pageTurn from "./assets/page turn.wav";
import { Timer } from "./components/Timer.tsx";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic.ts";

import win from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
import { useSound } from "./hooks/useSound.ts";

function App() {
  const game = useGame();

  const pageTurnAudio = useSound(pageTurn);
  const backgroundMusicAudio = useBackgroundMusic();
  const winAudio = useSound(win);
  const loseAudio = useSound(lose);

  // GETTING THE PLAYER STATE OBJECT FROM THE GAME STATE
  const player = game?.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  useEffect(() => {
    if (game?.newGame?.gameOver) {
      backgroundMusicAudio.pause();
      player.win ? winAudio.play() : loseAudio.play();
    }
    if (game?.newGame?.roundOver) pageTurnAudio.play();
  }, [game?.newGame?.roundOver]);

  return (
    <>
      {game && (
        <main className="flex h-screen w-full flex-col justify-between  bg-brilliant-azure pt-4 md:gap-4">
          <DanceFloor game={game}>
            {game.newGame.players.map((player: Player) => (
              <Character
                key={player.playerId}
                displayName={player.displayName}
                player={player}
                yourPlayerId={game.yourPlayerId}
                currentRound={game.newGame.currentRound}
              />
            ))}
            <Deck
              game={game}
              activeCardIndex={game.newGame.activeCardIndex}
              player={player}
            />
          </DanceFloor>
          <Controls
            game={game}
            player={player}
            activeCardIndex={game.newGame.activeCardIndex}
          />
          <Timer game={game} />
        </main>
      )}
    </>
  );
}

export default App;
