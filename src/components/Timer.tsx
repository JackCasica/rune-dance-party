const ROUND_INTERVAL = 6000; // milliseconds

export const Timer = ({ game }: { game: any }) => {
  const timeInGame = game.newGame.progress;
  const roundProgress = timeInGame % ROUND_INTERVAL; // milliseconds
  const timerPercentFilled = roundProgress / ROUND_INTERVAL;

  console.log(roundProgress);
  // const roundProgress = game.newGame.timeInSeconds % INTERVAL;
  // console.log(game.newGame.progress);

  return (
    <div id="timer" className="absolute left-0 top-0  h-full w-full ">
      <div
        className=" h-full w-screen origin-left bg-vivid-raspberry font-bold duration-200   "
        style={{
          transform: `scaleX(${timerPercentFilled})`,
        }}
      />
    </div>
  );
};
