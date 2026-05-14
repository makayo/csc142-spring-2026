type Props = {
  stepIndex: number;
  totalSteps: number;
};

export default function StatsPanel({ stepIndex, totalSteps }: Props) {
  const pct = totalSteps > 0 ? Math.round((stepIndex / totalSteps) * 100) : 0;

  return (
    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-sm flex items-center gap-4">
      <span className="text-slate-400">
        Step <span className="text-white font-bold">{stepIndex}</span>
        {" / "}
        <span className="text-white font-bold">{totalSteps}</span>
      </span>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-slate-400 w-10 tex