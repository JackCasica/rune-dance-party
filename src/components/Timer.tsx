import React from "react";
import { TimerProps } from "../types/types";

export const Timer: React.FC<TimerProps> = ({ game }) => {
    return (
        <div className="absolute w-16 p-4 text-xl font-bold text-black border-4 aspect-square top-2 right-2 rounded-3xl bg-white bg-opacity-50">
            {game.newGame.remainingTime}
        </div>
    );
};
