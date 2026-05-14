import type { Patient } from "../types/Patient";

export type Step = {
  i: number;
  j: number;
  action: "takeA" | "takeB";
  explanation: string;
  detail: string;
  merged: Patient[];
};

export function generateMergeSteps(a: Patient[], b: Patient[]): Step[] {
  let i = 0;
  let j = 0;
  const result: Patient[] = [];
  const steps: Step[] = [];

  while (i < a.length || j < b.length) {
    const A = a[i];
    const B = b[j];

    let action: "takeA" | "takeB";
    let explanation = "";
    let detail = "";

    if (!A) {
      result.push(B);
      j++;
      action = "takeB";
      explanation = `List A is exhausted — taking ${B.fullName} (${B.ssn}) from CarePlus.`;
      detail = `Pointer A has passed all ${a.length} records. Pointer B is at position ${j - 1} of ${b.length}. No comparison needed — drain remaining CarePlus records.`;
    } else if (!B) {
      result.push(A);
      i++;
      action = "takeA";
      explanation = `List B is exhausted — taking ${A.fullName} (${A.ssn}) from HealthMerge.`;
      detail = `Pointer B has passed all ${b.length} records. Pointer A is at position ${i - 1} of ${a.length}. No comparison needed — drain remaining HealthMerge records.`;
    } else if (A.ssn === B.ssn) {
      result.push(A);
      i++;
      action = "takeA";
      explanation = `⚠️ Duplicate SSN! Both lists have ${A.ssn} (${A.fullName}). Taking HealthMerge first.`;
      detail = `Pointer A (position ${i - 1}) and Pointer B (position ${j}) both point to SSN ${A.ssn}. This patient exists in both systems. The algorithm takes HealthMerge's record now — CarePlus version will be compared again next step.`;
    } else if (A.ssn < B.ssn) {
      result.push(A);
      i++;
      action = "takeA";
      explanation = `${A.ssn} < ${B.ssn} — ${A.fullName} from HealthMerge goes first.`;
      detail = `Pointer A (position ${i - 1}) points to ${A.ssn}. Pointer B (position ${j}) points to ${B.ssn}. Since ${A.ssn} comes first alphabetically, HealthMerge wins this comparison. Pointer A advances to position ${i}.`;
    } else {
      result.push(B);
      j++;
      action = "takeB";
      explanation = `${B.ssn} < ${A.ssn} — ${B.fullName} from CarePlus goes first.`;
      detail = `Pointer A (position ${i}) points to ${A.ssn}. Pointer B (position ${j - 1}) points to ${B.ssn}. Since ${B.ssn} comes first alphabetically, CarePlus wins this comparison. Pointer B advances to position ${j}.`;
    }

    steps.push({ i, j, action, explanation, detail, merged: [...result] });
  }

  return steps;
}
