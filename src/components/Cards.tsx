import React from "react";
import { Card } from "./Card";
import { CardsProps } from "../types/types";

export const Cards: React.FC<CardsProps> = ({ children }) => {
  return (
    <div className="relative h-fit w-full rounded-3xl bg-pink-600 p-2">
      {children}
    </div>
  );
};
