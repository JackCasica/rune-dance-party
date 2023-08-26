import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { Stage } from "./components/Stage";
import { useGame } from "./hooks/useGame.ts";
import { Cards } from "./components/Cards.tsx";
import type { Player } from "./types/types.ts";
import { useState, useEffect } from "react";
import purpleSoda from "./assets/purple-soda.mp3";
import { playSound } from "./util/playSound.ts";
import gameOverSound from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
import { Card } from "./components/Card.tsx";
import { CardProps } from "./types/types.ts";
const backgroundMusic = new Audio(purpleSoda);
backgroundMusic.volume = 0.1;

function App() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  /* THIS IS THE GAME DATA FROM SERVER. PASS THIS TO COMPONENTS THAT NEED GAME STATE DATA, ETC */
  const game = useGame();

  const player = game?.newGame.players.find(
    (player: Player) => player.playerId === game.yourPlayerId,
  );

  useEffect(() => {
    const playMusicOnce = () => {
      backgroundMusic.play();
      window.removeEventListener("click", playMusicOnce);
      // window.removeEventListener("touchstart", playMusicOnce);
      /* DOESNT SEEM TO PLAY WHEN BOTH ARE ONE, BUT WOULD BE BETTER FOR ACTUAL MOBILE TO USE TOUCHSTART */
    };

    window.addEventListener("click", playMusicOnce);
    // window.addEventListener("touchstart", playMusicOnce);
    /* DOESNT SEEM TO PLAY WHEN BOTH ARE ONE, BUT WOULD BE BETTER FOR ACTUAL MOBILE TO USE TOUCHSTART */

    return () => {
      window.removeEventListener("click", playMusicOnce);
      // window.removeEventListener("touchstart", playMusicOnce);
      /* DOESNT SEEM TO PLAY WHEN BOTH ARE ONE, BUT WOULD BE BETTER FOR ACTUAL MOBILE TO USE TOUCHSTART */
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
          <DanceFloor game={game}>
            {game.newGame.players.map((player: Player) => (
              <Character
                key={player.playerId}
                playerName={game.players[player.playerId].displayName}
                player={player}
                yourPlayerId={player.playerId}
              />
            ))}
            <Cards
              game={game}
              activeCardIndex={activeCardIndex}
              setActiveCardIndex={setActiveCardIndex}
            >
              {game.newGame.cardStack.map((cardItem: CardProps, i: number) => (
                <Card
                  key={`stage-cards-${i}`}
                  color={cardItem.color}
                  leftOffset={`${i * 10 + 2}px`}
                  z={`${game.newGame.cardStack.length - i}`}
                  limbs={cardItem.limbs}
                  shown={player.predictor}
                />
              ))}
            </Cards>
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
