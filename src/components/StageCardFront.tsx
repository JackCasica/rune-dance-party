type StageCardFrontProps = {
  limbs: number[];
  shown: boolean;
};

export const StageCardFront: React.FC<StageCardFrontProps> = ({
  limbs,
  shown,
}) => {
  return (
    <div
      className={`card__side card__side--front ${
        shown ? "show-front" : ""
      } bold relative flex w-full flex-col items-center rounded-xl border-4 border-black bg-white py-4 `}
    >
      <div className="relative flex w-1/2 items-center justify-center">
        <img src={`/limbs/torso.png`} className="z-10" />
        <img
          src={`/limbs/LeftArmPose=${limbs[0] - 1}.png`}
          className={`absolute left-0 top-1/4 w-3/4 -translate-x-[85%]`}
        />
        <img
          src={`/limbs/RightArmPose=${limbs[1] - 1}.png`}
          className={`absolute right-0 top-1/4 w-3/4 translate-x-[85%]`}
        />
        <img
          src={`/limbs/LeftLegPose=${limbs[2] - 1}.png`}
          className={`absolute bottom-0 left-0 w-3/4 -translate-x-[10%] translate-y-[85%]`}
        />
        <img
          src={`/limbs/RightLegPose=${limbs[3] - 1}.png`}
          className={`absolute bottom-0 right-0 w-3/4 translate-x-[10%] translate-y-[85%]`}
        />
      </div>
    </div>
  );
};
