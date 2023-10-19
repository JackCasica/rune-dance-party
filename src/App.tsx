import { Cards } from "./components/Cards.tsx";
import { Character } from "./components/Character.tsx";
import { Controls } from "./components/Controls.tsx";
import { DanceFloor } from "./components/DanceFloor.tsx";
import { useGame } from "./hooks/useGame.ts";

import type { Player } from "./types/types.ts";
import { useState, useEffect } from "react";
import backgroundMusic from "./assets/purple-soda.mp3";
import win from "./assets/game-over.wav";
import lose from "./assets/lose.wav";
import { Card } from "./components/Card.tsx";
import { CardProps } from "./types/types.ts";
import pageTurn from "./assets/page turn.wav";
import { Timer } from "./components/Timer.tsx";
import { Howl } from "howler";

const backgroundMusicAudio = new Howl({
    src: [backgroundMusic],
});

const pageTurnAudio = new Howl({
    src: [pageTurn],
});

const winAudio = new Howl({
    src: [win],
});

const loseAudio = new Howl({
    src: [lose],
});

const INTERVAL = 6; // THIS IS THE AMOUNT OF TIME IN A ROUND, IN SECONDS

function App() {
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
    const [appIsVisible, setAppIsVisible] = useState<boolean>(true);
    /* THIS IS THE GAME DATA FROM SERVER. PASS THIS TO COMPONENTS THAT NEED GAME STATE DATA, ETC */
    const game = useGame();

    if (game?.newGame.gameOver) {
        backgroundMusicAudio.pause();
        game.newGame.winner === game.yourPlayerId ? winAudio.play() : loseAudio.play();
    }

    const player = game?.newGame.players.find((player: Player) => player.playerId === game.yourPlayerId);

    useEffect(() => {
        const playMusicOnce = () => {
            backgroundMusicAudio.play();
            window.removeEventListener("touchstart", playMusicOnce);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                backgroundMusicAudio.pause();
                setAppIsVisible(false);
            } else {
                backgroundMusicAudio.play();
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
            player.playerId === game.yourPlayerId && pageTurnAudio.play();
        }
    }, [game?.newGame.remainingTime]);

    if (!appIsVisible) {
        return;
    }

    return (
        <>
            {game && (
                <main className="flex h-screen w-full flex-col justify-between gap-2 bg-brilliant-azure ">
                    <DanceFloor game={game}>
                        {game.newGame.players.map((player: Player, i) => (
                            <Character
                                key={player.playerId}
                                playerName={player.displayName}
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
                                        activeCardIndex={activeCardIndex}
                                        key={`stage-cards-${i}`}
                                        index={i}
                                        color={cardItem.color}
                                        rotate={i === activeCardIndex ? "0deg" : `${i * 5 + 10}deg`}
                                        z={i === activeCardIndex ? "50" : `${game.newGame.cardStack.length - i}`} // REVERSE OF INDEX
                                        limbs={cardItem.limbs}
                                        predictor={player.predictor}
                                        shown={
                                            i === activeCardIndex ? true : player.predictor && i === activeCardIndex + 1
                                        }
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
