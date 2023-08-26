import React from "react";
import { useState, useEffect } from "react";
import earnPoints from "../assets/earn-points.wav";
import { playSound } from "../util/playSound";
import { BodyProps, CharacterProps, LimbEnum, LimbProps } from "../types/types";
import noPoints from "../assets/no-points.wav";
import "../index.css";

const Limb: React.FC<LimbProps> = ({ limb, player }) => {
  let position;
  let limbType;
  const { autoLimb } = player;

  switch (limb) {
    case LimbEnum.LeftArm:
      position = "left-0 top-1/4 -translate-x-[85%]";
      limbType = "LeftArm";
      break;
    case LimbEnum.RightArm:
      position = "right-0 top-1/4 translate-x-[85%]";
      limbType = "RightArm";

      break;
    case LimbEnum.LeftLeg:
      position = "left-0 bottom-0 translate-y-[85%] -translate-x-[10%]";
      limbType = "LeftLeg";

      break;
    case LimbEnum.RightLeg:
      position = "right-0 bottom-0 translate-y-[85%] translate-x-[10%]";
      limbType = "RightLeg";
      break;
    default:
      position = "left-0 top-1/4";
      break;
  }

  return (
    <div
      className={`absolute text-xl font-black ${position} aspect-square w-3/4`}
    >
      <img
        src={`/limbs/${limbType}Pose=0.png`}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 1 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={`/limbs/${limbType}Pose=1.png`}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 2 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={`/limbs/${limbType}Pose=2.png`}
        className={`${
          limbType === "LeftArm" && autoLimb && "invert"
        } absolute ${player.limbs[limb] === 3 ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

const Body: React.FC<BodyProps> = ({ children, player }) => {
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

export const Character: React.FC<CharacterProps> = ({
  playerName,
  player,
  yourPlayerId,
}) => {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (player.scoreForRound > 0 && player.playerId === yourPlayerId) {
      /* THIS CONDITIONAL MAKES IT SO THAT EACH PLAYER CAN ONLY SEE THEIR OWN SCORE UPDATE AND HEAR THEIR OWN SOUND EFFECT WHEN THEY SCORE A POINT  */
      playSound(earnPoints);
    }
    if (player.scoreForRound === 0 && player.playerId === yourPlayerId) {
      /* THIS CONDITIONAL MAKES IT SO THAT EACH PLAYER CAN ONLY SEE THEIR OWN SCORE UPDATE AND HEAR THEIR OWN SOUND EFFECT WHEN THEY SCORE A POINT  */
      playSound(noPoints);
    }

    player.score !== 0 && setShowScore(true);

    const timer = setTimeout(() => {
      setShowScore(false);
    }, 500);
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [player.scoreForRound, player.score]);
  return (
    <div className="relative flex aspect-square w-full flex-col items-center rounded-3xl bg-black/0 p-4 font-black text-white ">
      <span className="text-shadow absolute top-0 -translate-y-1/2">
        {playerName}
      </span>
      <span
        className={`stroke-text absolute right-0 top-0 font-black transition-all duration-200 ${
          showScore ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {player.scoreForRound}
      </span>
      <Body player={player}>
        <Limb limb={LimbEnum.LeftArm} player={player} />
        <Limb limb={LimbEnum.RightArm} player={player} />
        <Limb limb={LimbEnum.LeftLeg} player={player} />
        <Limb limb={LimbEnum.RightLeg} player={player} />
      </Body>
    </div>
  );
};
