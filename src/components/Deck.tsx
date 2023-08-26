import { Card, DeckProps } from "../types/types";
import { StageCard } from "./StageCard";

export const Deck: React.FC<DeckProps> = ({
  children,
  stageCards,
  predictor,
}) => {
  return (
    <div
      id="deck"
      className="relative " // ... like me
    >
      {stageCards.map((cardItem: Card, i: number) => (
        <div key={`stage-cards-${i}`}>
          <StageCard
            color={cardItem.color}
            leftOffset={`${i * 10 + 2}px`}
            z={`${stageCards.length - i}`}
            limbs={cardItem.limbs}
            shown={predictor}
          />
        </div>
      ))}
    </div>
  );
};
