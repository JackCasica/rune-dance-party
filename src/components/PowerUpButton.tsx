import React from "react";

type PowerUpButtonProps = {
  powerUp: string;
  imageSource: string;
  soundEffect: string;
  correctStreak: number;
  cost: number;
  onClickHandler: (powerUp: string, cost: number) => void;
};

export const PowerUpButton: React.FC<PowerUpButtonProps> = ({
  powerUp,
  imageSource,
  correctStreak,
  cost,
  onClickHandler,
}) => {
  return (
    <button
      onClick={() => {
        onClickHandler(powerUp, cost);
      }}
      className={`relative flex  w-3/4 items-center justify-center rounded-3xl border-8 border-black p-2 text-sm font-black hover:cursor-pointer ${
        (correctStreak >= 1 && cost === 1) ||
        (correctStreak >= 2 && cost === 2) ||
        (correctStreak >= 3 && cost === 3)
          ? " opacity-100"
          : " opacity-20"
      }`}
    >
      <img className="aspect-square w-8" src={imageSource} />
    </button>
  );
};
