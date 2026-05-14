type Props = {
  onStart: () => void;
  onNext: () => void;
  onReset: () => void;
  onAutoPlay: () => void;
  isRunning: boolean;
  isFinished: boolean;
  autoPlay: boolean;
};

export default function MergeControls({
  onStart,
  onNext,
  onReset,
  onAutoPlay,
  isRunning,
  isFinished,
  autoPlay,
}: Props) {
  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={onStart}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors"
      >
        Start
      </button>

      <button
        onClick={onNext}
        disabled={!isRunning || isFinished || autoPlay}
        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next Step
      </button>

      <button
        onClick={onAutoPlay}
        disabled={!isRunning || isFinished}
        className={`px-4 py-2 rounded font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
          autoPlay
            ? "bg-yellow-500 hover:bg-yellow-400 text-black"
            : "bg-slate-600 hover:bg-slate-500"
        }`}
      >
        {autoPlay ? "⏸ Pause" : "▶ Auto Play"}
      </button>

      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded font-semibold transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
