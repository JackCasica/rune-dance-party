import { Cards } from "./components/Cards.tsx";
import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { useGame } from "./hooks/useGame.ts";

import type { Player } from "./types/types.ts";
import { useState, useEffect } from "react";
import purpleSoda from "./assets/purple-soda.mp3";
import { playSound } from "./util/playSound.ts";
import gameOverSound from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
import { Card } from "./components/Card.tsx";
import { CardProps } from "./types/types.ts";
import pageTurn from "./assets/page turn.wav";
import { Timer } from "./components/Timer.tsx";

const backgroundMusic = new Audio(purpleSoda);
backgroundMusic.volume = 0.1;
const INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS
function App() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  /* THIS IS THE GAME DATA FROM SERVER. PASS THIS TO COMPONENTS THAT NEED GAME STATE DATA, ETC */
  const game = useGame();

  if (game?.newGame.gameOver) {
    backgroundMusic.pause();
    game.newGame.winner === game.yourPlayerId
      ? playSound(gameOverSound)
      : playSound(lose);
  }

  const player = game?.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  useEffect(() => {
    const playMusicOnce = () => {
      backgroundMusic.play();
      window.removeEventListener("touchstart", playMusicOnce);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }
    };

    window.addEventListener("touchstart", playMusicOnce);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("touchstart", playMusicOnce);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  useEffect(() => {
    const progress = 60 - game?.newGame.remainingTime;
    if (progress % INTERVAL === 0 && progress < 59 && progress > 0) {
      Rune.actions.checkPlayerPoses({ index: activeCardIndex });
      if (game.newGame.cardStack.slice(1).length > 0) {
        setActiveCardIndex((prev: number) => prev + 1);
      }
      Rune.actions.incrementRoundNumber();
      player.playerId === game.yourPlayerId && playSound(pageTurn);
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
                playerName={game.players[player.playerId].displayName}
                player={player}
                yourPlayerId={game.yourPlayerId}
                currentRound={game.newGame.currentRound}
                playerIndex={i}
              />
            ))}
            <Cards>
              {game.newGame.cardStack.map((cardItem: CardProps, i: number) => {
                return (
                  <Card
                    key={`stage-cards-${i}`}
                    color={cardItem.color}
                    rotate={i === activeCardIndex ? "0deg" : `${i * 5 + 10}deg`}
                    z={
                      i === activeCardIndex
                        ? "50"
                        : `${game.newGame.cardStack.length - i}`
                    } // REVERSE OF INDEX
                    limbs={cardItem.limbs}
                    shown={i === activeCardIndex ? true : player.predictor}
                  />
                );
              })}
            </Cards>
          </DanceFloor>
          <Controls game={game} activeCardIndex={activeCardIndex} />
          <Timer game={game} />
        </main>
      )}
    </>
  );
}

export default App;
