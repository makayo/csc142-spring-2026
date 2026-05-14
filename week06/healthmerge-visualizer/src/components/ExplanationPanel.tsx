type Props = {
  text: string;
  detail: string;
  step: number;
};

export default function ExplanationPanel({ text, detail, step }: Props) {
  return (
    <div className="p-4 bg-slate-800 rounded-lg border border-slate-600 space-y-2">
      <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wide">
        Step {step} — What just happened
      </h3>
      <p className="text-white font-semibold">{text}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{detail}</p>
    </div>
  );
}
