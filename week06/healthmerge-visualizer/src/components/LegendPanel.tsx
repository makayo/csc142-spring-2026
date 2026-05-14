export default function LegendPanel() {
  const items = [
    { color: "bg-blue-500", label: "HealthMerge" },
    { color: "bg-green-500", label: "CarePlus" },
    { color: "bg-purple-500", label: "Merged Output" },
    { color: "bg-yellow-400", label: "Active Pointer" },
  ];

  return (
    <div className="flex flex-wrap gap-5 p-3 bg-slate-800 rounded-lg border border-slate-700 text-sm">
      {items.map(({ color, label }) => (
        <span key={label} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full inline-block ${color}`} />
          <span className="text-slate-300">{label}</span>
        </span>
      ))}
    </div>
  );
}
