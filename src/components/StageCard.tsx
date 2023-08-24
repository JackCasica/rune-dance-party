import React, { useState } from "react";
import type { StageCardProps } from "../types/types";
import { StageCardFront } from "./StageCardFront";
import { StageCardBack } from "./StageCardBack";

export const StageCard: React.FC<StageCardProps> = ({
  color,
  leftOffset,
  z,
  limbs,
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
      className={`card absolute`}
      style={{ left: leftOffset, zIndex: z, width: "20vw", height: "25vw" }}
    >
      <StageCardFront limbs={limbs} />
      <StageCardBack color={colorNicer[color]} />
    </div>
  );
};
