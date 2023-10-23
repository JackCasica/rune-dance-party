import React, { useState } from "react";

import type { StageCardProps } from "../types/types";
import { StageCardFront } from "./StageCardFront";
import { StageCardBack } from "./StageCardBack";
import { Player } from "../types/types";
export const Card: React.FC<StageCardProps> = ({
  color,
  rotate,
  attractActive,
  z,
  limbs,
  shown,
  game,
}) => {
  const [colorNicer] = useState<Record<string, string>>({
    pink: "bg-vivid-raspberry",
    yellow: "bg-ronchi",
    orange: "bg-willpower-orange",
    purple: "bg-blue-purple",
  });

  const attractedCardPosition = game.newGame.players.find(
    (player: Player) => player.attract === true,
  )?.attractedCardPosition;

  return (
    <div
      id="stage-card"
      className={`card   transition-all ${
        attractActive && shown
          ? attractedCardPosition
          : "absolute left-1/2 top-1/2 h-[25vw] w-[20vw] -translate-x-1/2 -translate-y-1/2 md:h-[16vw] md:w-[12vw]"
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
