import React from "react";
import { StageCard } from "./StageCard";
import { ActiveCardProps } from "../types/types";

export const ActiveCard: React.FC<ActiveCardProps> = ({ activeCard }) => {
  return (
    <div
      id="active-card"
      className={`mr-10 h-[25vw] w-[20vw] ${
        activeCard || "rounded-xl border-4 border-dashed border-black"
      }`}
    >
      {activeCard ? (
        <StageCard
          active={true}
          color={activeCard.color}
          limbs={activeCard.limbs}
          shown={true}
        />
      ) : (
        <> </>
      )}
    </div>
  );
};
