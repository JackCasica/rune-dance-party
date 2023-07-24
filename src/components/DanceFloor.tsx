import React from "react";
import { GameState } from "../logic";

type DanceFloorProps = {
    children?: React.ReactNode;
    game?: GameState; // Replace 'any' with the actual type of your game state
};

export const DanceFloor: React.FC<DanceFloorProps> = ({ children }) => {
    return (
        // <div className="grid w-11/12 h-full grid-cols-2 gap-4 p-4 border-8 border-black rounded-3xl place-items-center">
        <div className="grid h-full grid-cols-2 gap-4 p-2 rounded-3xl place-items-center bg-black/20">{children}</div>
    );
};
