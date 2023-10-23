import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { Deck } from "./components/Deck.tsx";
import { useGame } from "./hooks/useGame.ts";
import type { Player } from "./types/types.ts";
import { useState, useEffect } from "react";
import pageTurn from "./assets/page turn.wav";
import { Timer } from "./components/Timer.tsx";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic.ts";

import win from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
import { useSound } from "./hooks/useSound.ts";

const ROUND_INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS

function App() {
  const game = useGame();
  const pageTurnAudio = useSound(pageTurn);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const gameOver = game?.newGame.gameOver;
  const progress = game?.newGame.progress;
  const remainingTime = game?.newGame.remainingTime;
  const backgroundMusicAudio = useBackgroundMusic();
  const winAudio = useSound(win);
  const loseAudio = useSound(lose);

  // GETTING THE PLAYER STATE OBJECT FROM THE GAME STATE
  const player = game?.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  if (gameOver) {
    backgroundMusicAudio.pause();
    player.win ? winAudio.play() : loseAudio.play();
  }

  useEffect(() => {
    const roundOver = progress % ROUND_INTERVAL === 0;
    const stillTimeRemaining = progress < 59;
    const notFirstRound = progress > 0; // Check if game has just started
    const stillCardsRemaining = game?.newGame.cardStack.slice(1).length > 0;
    Rune.actions.setActiveCard({ activeCardIndex: activeCardIndex });

    // SETS PLAYERS SCORE FOR THE ROUND A SECOND EARLY IF IT IS THE LAST ROUND. REQUIRED FOR THE LAST ROUND TO BE SCORED
    if (progress === 59) {
      Rune.actions.setPlayerScoresForRound();
      Rune.actions.setPlayerTotalScore();
      Rune.actions.setPlayerStreak();
      Rune.actions.resetShuffledControls();
      Rune.actions.resetAutoLimb();
      Rune.actions.resetAttract();
    }

    if (roundOver && notFirstRound && stillTimeRemaining) {
      Rune.actions.setPlayerScoresForRound();
      Rune.actions.setPlayerTotalScore();
      Rune.actions.setPlayerStreak();
      Rune.actions.resetShuffledControls();
      Rune.actions.resetAutoLimb();
      Rune.actions.resetAttract();

      if (stillCardsRemaining) {
        setActiveCardIndex((prev: number) => prev + 1);
      }

      player.playerId === game.yourPlayerId && pageTurnAudio.play();

      Rune.actions.incrementRoundNumber();
    }
  }, [remainingTime]);

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
