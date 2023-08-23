import React, { useState } from "react";
import type { StageCardProps } from "../types/types";

export const StageCard: React.FC<StageCardProps> = ({
  color,
  leftOffset,
  z,
  active,
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
    <>
      <div
        id="stage-card"
        className={`absolute rounded-xl border-8 border-black ${colorNicer[color]} overflow-hidden`}
        style={{ left: leftOffset, zIndex: z, width: "20vw", height: "25vw" }}
      >
        {shown ? (
          <div className="bold relative flex w-full flex-col items-center py-4">
            <div className="relative flex w-1/2 items-center justify-center">
              <img src={`/limbs/torso.png`} className="z-10" />
              <img
                src={`/limbs/LeftArmPose=${limbs[0] - 1}.png`}
                className={`absolute w-3/4 ${`left-0 top-1/4 -translate-x-[85%]`}`}
              />
              <img
                src={`/limbs/RightArmPose=${limbs[1] - 1}.png`}
                className={`absolute w-3/4 ${`right-0 top-1/4 translate-x-[85%]`}`}
              />
              <img
                src={`/limbs/LeftLegPose=${limbs[2] - 1}.png`}
                className={`absolute w-3/4 ${`bottom-0 left-0 -translate-x-[10%] translate-y-[85%]`}`}
              />
              <img
                src={`/limbs/RightLegPose=${limbs[3] - 1}.png`}
                className={`absolute w-3/4 ${`bottom-0 right-0 translate-x-[10%] translate-y-[85%]`}`}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className={`relative flex w-full items-center justify-center overflow-clip opacity-50`}
              style={{ width: "19vw", height: "23vw" }}
            >
              <img src={`/limbs/Card Pattern.png`} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
