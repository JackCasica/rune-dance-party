import LeftArmPose0 from "../assets/limbs/LeftArmPose=0.png";
import LeftArmPose1 from "../assets/limbs/LeftArmPose=1.png";
import LeftArmPose2 from "../assets/limbs/LeftArmPose=2.png";
import LeftLegPose0 from "../assets/limbs/LeftLegPose=0.png";
import LeftLegPose1 from "../assets/limbs/LeftLegPose=1.png";
import LeftLegPose2 from "../assets/limbs/LeftLegPose=2.png";
import RightArmPose0 from "../assets/limbs/RightArmPose=0.png";
import RightArmPose1 from "../assets/limbs/RightArmPose=1.png";
import RightArmPose2 from "../assets/limbs/RightArmPose=2.png";
import RightLegPose0 from "../assets/limbs/RightLegPose=0.png";
import RightLegPose1 from "../assets/limbs/RightLegPose=1.png";
import RightLegPose2 from "../assets/limbs/RightLegPose=2.png";
import torso from "../assets/limbs/torso.png";

type StageCardFrontProps = {
  limbs: number[];
  shown: boolean;
};

export const StageCardFront: React.FC<StageCardFrontProps> = ({
  limbs,
  shown,
}) => {
  const limbImages = {
    LeftArm: [LeftArmPose0, LeftArmPose1, LeftArmPose2],
    RightArm: [RightArmPose0, RightArmPose1, RightArmPose2],
    LeftLeg: [LeftLegPose0, LeftLegPose1, LeftLegPose2],
    RightLeg: [RightLegPose0, RightLegPose1, RightLegPose2],
  };

  return (
    <div
      className={`card__side card__side--front ${
        shown ? "show-front" : ""
      } bold relative flex w-full flex-col items-center rounded-xl border-4 border-black bg-white py-4 `}
    >
      <div className="relative flex w-1/2 items-center justify-center">
        <img src={torso} className="z-10" />
        <img
          src={limbImages.LeftArm[limbs[0] - 1]}
          className="absolute left-0 top-1/4 w-3/4 -translate-x-[85%]"
        />
        <img
          src={limbImages.RightArm[limbs[1] - 1]}
          className="absolute right-0 top-1/4 w-3/4 translate-x-[85%]"
        />
        <img
          src={limbImages.LeftLeg[limbs[2] - 1]}
          className="absolute bottom-0 left-0 w-3/4 -translate-x-[10%] translate-y-[85%]"
        />
        <img
          src={limbImages.RightLeg[limbs[3] - 1]}
          className="absolute bottom-0 right-0 w-3/4 translate-x-[10%] translate-y-[85%]"
        />
      </div>
    </div>
  );
};
