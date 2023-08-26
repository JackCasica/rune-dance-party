import React from "react";

import { CardsProps } from "../types/types";

export const Cards: React.FC<CardsProps> = ({ children }) => {
  return (
    <div className="absolute  overflow-visible rounded-full bg-pink-600 ">
      {children}
    </div>
  );
};
