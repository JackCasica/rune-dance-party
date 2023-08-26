export const StageCardBack = ({ color, shown }) => {
  return (
    <div
      className={`card__side card__side--back ${
        shown ? "hide-back" : ""
      } flex w-full items-center justify-center overflow-clip rounded-xl border-4 border-black ${color}`}
    >
      <img src={`/limbs/Card Pattern.png`} className="opacity-50" />
    </div>
  );
};
