import React from "react";

import { CardProps, DeckProps } from "../types/types";
import { Card } from "./Card";

export const Deck: React.FC<DeckProps> = ({ game, activeCardIndex }) => {
  return (
    <div className="absolute z-50 aspect-square  w-1/2 rounded-full border-8 border-black bg-pink-600">
      {game.newGame.cardStack.map((cardItem: CardProps, i: number) => {
        return (
          <Card
            activeCardIndex={activeCardIndex}
            key={`stage-cards-${i}`}
            index={i}
            color={cardItem.color}
            rotate={i === activeCardIndex ? "0deg" : `${i * 5 + 10}deg`}
            z={
              i === activeCardIndex
                ? "50"
                : `${game.newGame.cardStack.length - i}`
            } // REVERSE OF INDEX
            limbs={cardItem.limbs}
            attractActive={game.newGame.attractActive}
            shown={i === activeCardIndex}
            game={game}
          />
        );
      })}
    </div>
  );
};
