import React from "react";
import { BodyProps } from "../types/types";
import "../index.css";

export const Body: React.FC<BodyProps> = ({ children, player }) => {
  const { playerColor } = player;
  return (
    <div className="relative flex w-1/2 items-center justify-center rounded-full bg-black/0">
      <img
        src={`/limbs/torso-${playerColor}.png`}
        className="bobbing-animation z-10"
      />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { player: player });
        }
        return child;
      })}
    </div>
  );
};
