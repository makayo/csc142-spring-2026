import { Patient } from "../types/Patient";

export function mergeSortedLists(a: Patient[], b: Patient[]) {
  const result: Patient[] = [];

  let i = 0;
  let j = 0;

  while (i < a.length || j < b.length) {
    const A = a[i];
    const B = b[j];

    // If A is exhausted, take from B
    if (!A) {
      result.push(B);
      j++;
      continue;
    }

    // If B is exhausted, take from A
    if (!B) {
      result.push(A);
      i++;
      continue;
    }

    // Normal comparison
    if (A.ssn <= B.ssn) {
      result.push(A);
      i++;
    } else {
      result.push(B);
      j++;
    }
  }

  return result;
}
