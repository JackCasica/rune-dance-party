export const StageCardBack = ({ color }) => {
  return (
    <div
      className={`card__side card__side--back flex w-full items-center justify-center overflow-clip rounded-xl border-8 border-black ${color}`}
    >
      <img src={`/limbs/Card Pattern.png`} className="opacity-50" />
    </div>
  );
};
