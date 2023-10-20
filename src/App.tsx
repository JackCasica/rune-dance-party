import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { Deck } from "./components/Deck.tsx";
import { useGame } from "./hooks/useGame.ts";

import type { Player } from "./types/types.ts";
import { useState, useEffect } from "react";

import pageTurn from "./assets/page turn.wav";
import { Timer } from "./components/Timer.tsx";
import { Howl } from "howler";
import { playGameOverSound } from "./util/playGameOverSound.ts";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic.ts";


const pageTurnAudio = new Howl({
  src: [pageTurn],
});

const ROUND_INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS

function App() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  // const [appIsVisible, setAppIsVisible] = useState<boolean>(true);
  /* THIS IS THE GAME DATA FROM SERVER. PASS THIS TO COMPONENTS THAT NEED GAME STATE DATA, ETC */
  const game = useGame();
  const backgroundMusicAudio = useBackgroundMusic();

  if (game?.newGame.gameOver) {
    backgroundMusicAudio.pause();
    playGameOverSound(game.newGame.winner === game.yourPlayerId);
  }

  // GETTING THE PLAYER STATE OBJECT FROM THE GAME STATE
  const player = game?.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  useEffect(() => {
    const progress = game?.newGame.progress;
    const roundOver = progress % ROUND_INTERVAL === 0;
    const stillTimeRemaining = progress < 59;
    const notFirstRound = progress > 0;

    Rune.actions.setActiveCard({ activeCardIndex: activeCardIndex });

    if (roundOver && stillTimeRemaining && notFirstRound) {
      Rune.actions.setScoreForRound();
      Rune.actions.setPlayerStreak();
      Rune.actions.setPlayerTotalScore();

      if (game.newGame.cardStack.slice(1).length > 0) {
        setActiveCardIndex((prev: number) => prev + 1);
      }
      Rune.actions.incrementRoundNumber();
      player.playerId === game.yourPlayerId && pageTurnAudio.play();
    }
  }, [game?.newGame.remainingTime]);

  return (
    <>
      {game && (
        <main className="flex h-screen w-full flex-col justify-between gap-2 bg-brilliant-azure ">
          <DanceFloor game={game}>
            {game.newGame.players.map((player: Player, i) => (
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
              activeCardIndex={activeCardIndex}
              player={player}
            />
          </DanceFloor>
          <Controls
            game={game}
            player={player}
            activeCardIndex={activeCardIndex}
          />
          <Timer game={game} />
        </main>
      )}
    </>
  );
}

export default App;
