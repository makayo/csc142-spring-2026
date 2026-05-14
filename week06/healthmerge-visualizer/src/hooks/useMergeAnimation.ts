import { useState } from "react";
import type { Patient } from "../types/Patient";
import type { Step } from "../types/Step";
import { generateMergeSteps } from "../algorithms/generateMergeSteps";

export function useMergeAnimation(listA: Patient[], listB: Patient[]) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    const generated = generateMergeSteps([...listA], [...listB]);
    setSteps(generated);
    setStepIndex(0);
    setIsRunning(true);
  }

  function next() {
    if (stepIndex < steps.length) {
      setStepIndex((prev) => prev + 1);
    }
  }

  function reset() {
    setSteps([]);
    setStepIndex(0);
    setIsRunning(false);
  }

  const isFinished = isRunning && stepIndex >= steps.length;
  const lastStep: Step | null = stepIndex > 0 ? steps[stepIndex - 1] : null;
  const pointerI = isRunning ? (lastStep ? lastStep.i : 0) : -1;
  const pointerJ = isRunning ? (lastStep ? lastStep.j : 0) : -1;
  const merged: Patient[] = lastStep?.merged ?? [];

  return {
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
    totalSteps: steps.length,
  };
}
