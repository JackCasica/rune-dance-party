import React from "react";

import type { LimbControlsProps } from "../types/types";
import { LimbButton } from "./LimbButton";

export const LimbControls: React.FC<LimbControlsProps> = ({ player }) => {
  const { controlsOrder, autoLimb, playerColor } = player;

  return (
    <div
      className={`flex h-3/4 w-full overflow-clip rounded-3xl border-8 border-black ${playerColor}`}
    >
      {controlsOrder.map((control: string) => (
        <LimbButton control={control} autoLimbActive={autoLimb} />
      ))}
    </div>
  );
};
