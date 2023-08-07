import React from "react";
import { DanceFloorProps } from "../types/types";

export const DanceFloor: React.FC<DanceFloorProps> = ({ children }) => {
	return (
		// <div className="grid w-11/12 h-full grid-cols-2 gap-4 p-4 border-8 border-black rounded-3xl place-items-center">
		<div className="grid w-full h-full grid-cols-2 gap-4 p-2 rounded-3xl place-items-center bg-black/0">
			{children}
		</div>
	);
};
