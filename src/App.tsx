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
import pageTurn from "./assets/page turn.wav";

const backgroundMusic = new Audio(purpleSoda);
backgroundMusic.volume = 0.1;
const INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS
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

  const [stageCards, setStageCards] = useState<CardProps[]>(
    game?.newGame.cardStack.slice(1),
  );

  useEffect(() => {
    // TRIGGERED BY THE ACTIVE CARD INDEX CHANGING (skips initial render tho)
    if (activeCardIndex > 0) {
      setStageCards((prev) => prev.slice(1));
    }
  }, [activeCardIndex]);

  if (game?.gameOver) {
    backgroundMusic.pause();
    game.newGame.winner === game.yourPlayerId
      ? playSound(gameOverSound)
      : playSound(lose);
  }

  useEffect(() => {
    const progress = 60 - game?.newGame.remainingTime;
    if (progress % INTERVAL === 0 && progress < 59 && progress > 0) {
      Rune.actions.checkPlayerPoses({ index: activeCardIndex });

      if (stageCards?.length > 0) {
        setActiveCardIndex((prev: number) => prev + 1);
      }

      Rune.actions.incrementRoundNumber();
      playSound(pageTurn);
    }
  }, [game?.newGame.remainingTime]);

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
              activeCard={game.newGame.cardStack[activeCardIndex]}
              stageCards={stageCards}
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
