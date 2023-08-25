import React, { useState } from "react";
import type { StageCardProps } from "../types/types";
import { StageCardFront } from "./StageCardFront";
import { StageCardBack } from "./StageCardBack";

export const StageCard: React.FC<StageCardProps> = ({
  color,
  leftOffset,
  z,
  limbs,
  shown,
}) => {
  const [colorNicer, setColorNicer] = useState<Record<string, string>>({
    pink: "bg-vivid-raspberry",
    yellow: "bg-ronchi",
    orange: "bg-willpower-orange",
    purple: "bg-blue-purple",
  });

  return (
    <div
      id="stage-card"
      className={`card absolute h-[25vw] w-[20vw] `}
      style={{ left: leftOffset, zIndex: z }}
    >
      <StageCardFront limbs={limbs} shown={shown} />
      <StageCardBack color={colorNicer[color]} shown={shown} />
    </div>
  );
};
