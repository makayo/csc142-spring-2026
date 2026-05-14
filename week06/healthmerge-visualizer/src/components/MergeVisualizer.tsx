import { useState } from "react";
import PatientNode from "./PatientNode";
import MergeControls from "./MergeControls";
import ExplanationPanel from "./ExplanationPanel";
import LegendPanel from "./LegendPanel";
import StatsPanel from "./StatsPanel";
import { useMergeAnimation } from "../hooks/useMergeAnimation";
import { useAutoPlay } from "../hooks/useAutoPlay";
import { healthMergePatients, carePlusPatients } from "../data/samplePatients";

export default function MergeVisualizer() {
  const {
    start,
    next,
    reset,
    isRunning,
    isFinished,
    lastStep,
    merged,
    pointerI,
    pointerJ,
    stepIndex,
    totalSteps,
  } = useMergeAnimation(healthMergePatients, carePlusPatients);

  const [autoPlay, setAutoPlay] = useState(false);

  useAutoPlay(autoPlay && isRunning && !isFinished, next);

  function handleStart() {
    setAutoPlay(false);
    start();
  }
  function handleReset() {
    setAutoPlay(false);
    reset();
  }

  function getCardState(idx: number, pointer: number) {
    if (!isRunning || isFinished) return "idle";
    if (idx === pointer) return "active";
    if (idx < pointer) return "done";
    return "upcoming";
  }

  const cardClass = (state: string) => {
    switch (state) {
      case "active":
        return "ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/25 scale-[1.02]";
      case "done":
        return "opacity-35 scale-[0.97]";
      case "upcoming":
        return "opacity-60";
      default:
        return "";
    }
  };

  const activeA =
    isRunning && !isFinished && pointerI < healthMergePatients.length
      ? healthMergePatients[pointerI]
      : null;
  const activeB =
    isRunning && !isFinished && pointerJ < carePlusPatients.length
      ? carePlusPatients[pointerJ]
      : null;

  return (
    <div className="space-y-6">
      <LegendPanel />

      <MergeControls
        onStart={handleStart}
        onNext={next}
        onReset={handleReset}
        onAutoPlay={() => setAutoPlay((v) => !v)}
        isRunning={isRunning}
        isFinished={isFinished}
        autoPlay={autoPlay}
      />

      {isRunning && (
        <StatsPanel stepIndex={stepIndex} totalSteps={totalSteps} />
      )}

      {/* BEFORE START */}
      {!isRunning && (
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-slate-400 text-sm leading-relaxed">
          <p className="text-white font-semibold mb-1">How this works</p>
          Both lists are sorted by SSN. The algorithm compares the front of each
          list and always takes the smaller SSN first — building one unified
          sorted list. Press{" "}
          <span className="text-blue-400 font-semibold">Start</span> to walk
          through it step by step.
        </div>
      )}

      {/* LAST ACTION — what just happened */}
      {lastStep && (
        <ExplanationPanel
          text={`✓ ${lastStep.explanation}`}
          detail={lastStep.detail}
          step={stepIndex}
        />
      )}

      {/* UP NEXT — what the yellow highlights mean */}
      {activeA && activeB && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-yellow-300 text-sm">
          ➜ Up next — comparing:{" "}
          <strong>
            {activeA.ssn} ({activeA.fullName})
          </strong>
          {" from HealthMerge vs "}
          <strong>
            {activeB.ssn} ({activeB.fullName})
          </strong>
          {" from CarePlus — click Next Step to decide"}
        </div>
      )}

      {/* SIDE BY SIDE LISTS */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-blue-400 font-bold mb-3 text-base tracking-wide uppercase">
            🏥 HealthMerge
          </h2>
          <div className="flex flex-col gap-2">
            {healthMergePatients.map((p, idx) => (
              <div
                key={p.ssn + "A"}
                className={`rounded-xl transition-all duration-300 ${cardClass(getCardState(idx, pointerI))}`}
              >
                <PatientNode {...p} color="blue" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-green-400 font-bold mb-3 text-base tracking-wide uppercase">
            💊 CarePlus
          </h2>
          <div className="flex flex-col gap-2">
            {carePlusPatients.map((p, idx) => (
              <div
                key={p.ssn + "B"}
                className={`rounded-xl transition-all duration-300 ${cardClass(getCardState(idx, pointerJ))}`}
              >
                <PatientNode {...p} color="green" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MERGED OUTPUT */}
      <div>
        <h2 className="text-purple-400 font-bold mb-3 text-base tracking-wide uppercase">
          ✅ Merged Result
        </h2>
        {merged.length === 0 && isRunning && (
          <p className="text-slate-500 text-sm italic mb-2">
            Records will appear here as the merge progresses...
          </p>
        )}
        {merged.length === 0 && !isRunning && (
          <p className="text-slate-600 text-sm italic">
            The merged list will build here once you start.
          </p>
        )}
        <div className="flex gap-3 flex-wrap">
          {merged.map((p, idx) => (
            <div
              key={`${p.ssn}-${p.fullName}-${idx}`}
              className={`rounded-xl transition-all duration-300 ${
                idx === merged.length - 1
                  ? "ring-2 ring-purple-400 shadow-md shadow-purple-400/20 scale-[1.03]"
                  : ""
              }`}
            >
              <PatientNode {...p} color="purple" />
            </div>
          ))}
        </div>
      </div>

      {/* COMPLETION */}
      {isFinished && (
        <div className="border border-green-600 bg-green-950/40 rounded-xl px-5 py-4">
          <p className="text-green-400 font-bold text-lg">✓ Merge Complete</p>
          <p className="text-green-300/70 text-sm mt-1">
            {merged.length} patient records successfully integrated in SSN
            order.
          </p>
        </div>
      )}
    </div>
  );
}
