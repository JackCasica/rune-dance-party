import React, { useState } from "react";

import type { StageCardProps } from "../types/types";
import { StageCardFront } from "./StageCardFront";
import { StageCardBack } from "./StageCardBack";

export const Card: React.FC<StageCardProps> = ({
    activeCardIndex,
    index,
    color,
    rotate,
    predictor,
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
            className={`card absolute left-1/2 top-1/2 h-[25vw] w-[20vw] -translate-x-1/2 transition-all ${
                predictor && index === activeCardIndex + 1
                    ? "translate-x-0 translate-y-full -rotate-45"
                    : "-translate-y-1/2"
            }`}
            style={{
                zIndex: z,
                rotate: rotate,
            }}
        >
            <StageCardFront limbs={limbs} shown={shown} />
            <StageCardBack color={colorNicer[color]} shown={shown} />
        </div>
    );
};
