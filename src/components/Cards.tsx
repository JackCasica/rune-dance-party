import React, { useEffect, useState } from "react";
import { playSound } from "../util/playSound";
import pageTurn from "../assets/page turn.wav";
import { RoundTimerProps } from "../types/types";
import { Card } from "./Card";
import {
  CardProps,
  CardsProps,
  Player,
  StageProps,
  StageContainerProps,
} from "../types/types";

import { RoundTimer } from "./RoundTimer";
import { Timer } from "./Timer";
import { ActiveCard } from "./ActiveCard";

export const Cards: React.FC<CardsProps> = ({ children, activeCard }) => {
  return (
    <div className="relative h-fit w-full rounded-3xl bg-pink-600 p-2">
      <div
        id="active-card"
        className={` h-[25vw] w-[20vw] ${
          activeCard || "rounded-xl border-4 border-dashed border-black"
        }`}
      >
        {activeCard ? (
          <Card
            active={true}
            color={activeCard.color}
            limbs={activeCard.limbs}
            shown={true}
          />
        ) : (
          <> </>
        )}
      </div>
      <div className="cards">{children}</div>
    </div>
  );
};
