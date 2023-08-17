import React, { useState } from "react";
import type { StageCardProps } from '../types/types'

export const StageCard: React.FC<StageCardProps> = ({
  color,
  leftOffset,
  z,
  active,
  limbs,
  shown
}) => {
  const [colorNicer, setColorNicer] = useState<Record<string,string>>({
    'pink': 'bg-vivid-raspberry',
    'yellow': 'bg-ronchi',
    'orange': 'bg-willpower-orange',
    'purple': 'bg-blue-purple',
    }) 
  
  return (
    <>
      <div
        id="stage-card"
        className= {`absolute w-10 h-14 border-4 ${active ? "border-white" : "border-black"} rounded-xl ${colorNicer[color]}`}
        style={{ left: leftOffset , zIndex: z, width: "20vw", height: "25vw" }}
      >
        {shown ? 
        <div className="bold">
          {limbs && limbs[0]}
          {limbs && limbs[1]}
          <br />
          {limbs && limbs[2]}
          {limbs && limbs[3]}
          </div>
          :
          <>
          <br/>
          ?
          </>
          }
      </div>
    </>
  );
};
