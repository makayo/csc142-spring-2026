const colorMap: Record<string, string> = {
  blue: "border-blue-500 bg-blue-950/50 text-blue-100",
  green: "border-green-500 bg-green-950/50 text-green-100",
  purple: "border-purple-500 bg-purple-950/50 text-purple-100",
};

interface Props {
  ssn: string;
  fullName: string;
  age: number;
  color: "blue" | "green" | "purple";
}

export default function PatientNode({ ssn, fullName, age, color }: Props) {
  return (
    <div
      className={`min-w-[220px] rounded-xl border p-4 shadow-lg transition-all duration-300 ${colorMap[color] ?? ""}`}
    >
      <p className="font-mono font-bold text-sm">{ssn}</p>
      <p className="text-sm mt-1">{fullName}</p>
      <p className="text-xs opacity-60 mt-0.5">Age {age}</p>
    </div>
  );
}
