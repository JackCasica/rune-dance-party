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
        className={`absolute border-4 ${
          active ? "border-white" : "border-black"
        } rounded-xl ${colorNicer[color]}`}
        style={{ left: leftOffset, zIndex: z, width: "20vw", height: "25vw" }}
      >
        {shown ? (
          <div className="bold relative flex flex-col items-center w-full py-4">
            <div className="relative flex items-center w-1/2 justify-center">
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
                className={`absolute w-3/4 ${`left-0 bottom-0 translate-y-[85%] -translate-x-[10%]`}`}
              />
              <img
                src={`/limbs/RightLegPose=${limbs[3] - 1}.png`}
                className={`absolute w-3/4 ${`right-0 bottom-0 translate-y-[85%] translate-x-[10%]`}`}
              />
            </div>
          </div>
        ) : (
          <>
            {/* <br />? */}
            <div className={`relative flex items-center w-full justify-center opacity-50`}
            style={{ width: "19vw", height: "23vw" }}
            >

            <img
              src={`/limbs/Card Pattern.png`}
              />
              </div>
          </>
        )}
      </div>
    </>
  );
};
