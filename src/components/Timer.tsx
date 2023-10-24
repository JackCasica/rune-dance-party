const INTERVAL = 6;

export const Timer = ({ game }: { game: any }) => {
  const progress = 60 - game?.newGame.remainingTime;
  const timeInRound = progress % INTERVAL;

  return (
    <div id="timer" className="absolute left-0 top-0  h-full w-full ">
      <div
        className="h-[1vh] w-full  bg-vivid-raspberry font-bold transition-all duration-1000 ease-linear "
        style={{
          width: `${timeInRound * 20}%`,
        }}
      />
    </div>
  );
};
