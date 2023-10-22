import React, { useState } from "react";

import type { StageCardProps } from "../types/types";
import { StageCardFront } from "./StageCardFront";
import { StageCardBack } from "./StageCardBack";

export const Card: React.FC<StageCardProps> = ({
  color,
  rotate,
  attract,
  z,
  limbs,
  shown,
  playerPosition,
}) => {
  const [colorNicer] = useState<Record<string, string>>({
    pink: "bg-vivid-raspberry",
    yellow: "bg-ronchi",
    orange: "bg-willpower-orange",
    purple: "bg-blue-purple",
  });

  let cardPosition;
  switch (playerPosition) {
    case "top-left":
      cardPosition = "fixed left-0 top-0";
      break;
    case "top-right":
      cardPosition = "fixed right-0 top-0";
      break;
    case "bottom-left":
      cardPosition = "fixed left-0 bottom-[21%]";
      break;
    case "bottom-right":
      cardPosition = "fixed right-0 bottom-[21%]";
      break;
  }

  return (
    <div
      id="stage-card"
      className={`card h-[25vw] w-[20vw]  transition-all ${
        attract && shown
          ? cardPosition
          : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      }`}
      style={{
        zIndex: z,
        rotate: rotate,
      }}
    >
      <StageCardFront limbs={limbs} shown={shown} />
      <StageCardBack color={colorNicer[color]} shown={shown} />
    </div>
  );
};
