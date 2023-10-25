import cardPattern from "../assets/Card Pattern.png";

type StageCardBackProps = {
  color: string;
  shown: boolean;
};

export const StageCardBack: React.FC<StageCardBackProps> = ({
  color,
  shown,
}) => {
  return (
    <div
      className={`card__side card__side--back ${
        shown ? "hide-back" : ""
      } flex w-full items-center justify-center overflow-clip rounded-xl border-4 border-black ${color}`}
    >
      <img src={cardPattern} className="opacity-50" />
    </div>
  );
};
