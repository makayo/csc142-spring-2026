# HealthMerge Patient Record Integration

A step-by-step interactive visualizer that demonstrates how two sorted patient lists are merged into one unified record using the Merge Sorted Lists algorithm.

Built with React, TypeScript, and Vite.

---

## Problem Overview

Two healthcare systems — HealthMerge and CarePlus — each maintain their own sorted list of patient records ordered by SSN. When the systems merge, patient records must be combined into a single sorted list without losing any data.

This tool walks through the merge algorithm step by step, showing exactly which record is selected at each comparison and why.

---

## Clarifying Questions

Before implementing, these questions should be asked:

- Are both input lists guaranteed to be sorted? Yes, sorted by SSN
- Can duplicate SSNs exist across both lists? Yes — same patient may appear in both systems
- Should duplicates be preserved or deduplicated? Preserved — both records kept
- What is the sort key? SSN string, compared lexicographically
- Can either list be empty? Yes — handled as an edge case

---

## Algorithm Flowchart

    Start
      |
      |-- Both lists have records?
      |       |
      |       |-- YES → Compare A[i].ssn vs B[j].ssn
      |       |           |
      |       |           |-- A[i] < B[j]  → Take A[i], advance i
      |       |           |-- A[i] = B[j]  → Take A[i] first (duplicate), advance i
      |       |           └-- A[i] > B[j]  → Take B[j], advance j
      |       |
      |       └-- NO → One list exhausted
      |                   |
      |                   |-- A exhausted → drain remaining B
      |                   └-- B exhausted → drain remaining A
      |
    End → Merged list complete

---

## Algorithm Steps

Step 1 — Initialize Pointers
Two pointers i and j start at the front of each list.

Step 2 — Compare Front Records
At each step compare A[i].ssn and B[j].ssn.
Take the smaller SSN and advance that pointer.
On duplicate SSN — take HealthMerge first, CarePlus follows next step.

Step 3 — Drain Remaining
When one list is exhausted, append all remaining records from the other list.

Step 4 — Done
Result is a fully merged SSN-sorted list.

---

## Time and Space Complexity

Time:  O(n + m) — every record from both lists is visited exactly once
Space: O(n + m) — output list holds all records from both inputs

Where n = records in HealthMerge, m = records in CarePlus.

---

## Test Suite

Run the full test suite:

    npm test

Normal Cases:

    1. Basic sorted merge     — two interleaved lists produce correct SSN order
    2. Interleaved ordering   — alternating SSNs merge cleanly
    3. One empty list         — returns the non-empty list unchanged

Edge Cases:

    4. Duplicate SSNs preserved — same SSN in both lists, both records kept
    5. Both lists empty         — returns empty array
    6. Large imbalance          — one list much longer, all records included

Test Results:

    ✓ tests/mergeSortedLists.test.ts (6 tests)
      ✓ Merge Sorted Lists - Normal Cases (3)
        ✓ basic sorted merge
        ✓ interleaved ordering
        ✓ one empty list
      ✓ Merge Sorted Lists - Edge Cases (3)
        ✓ duplicate SSNs preserved
        ✓ both lists empty
        ✓ large imbalance case

    Test Files  1 passed
    Tests       6 passed

---

## How to Run

    npm install
    npm run dev

Open http://localhost:5173 in your browser.

Using the Visualizer:

    1. Press Start      — both lists appear with first comparison highlighted in yellow
    2. Press Next Step  — see which record was selected and exactly why
    3. Watch Merged Result build one card at a time
    4. Press Auto Play  — watch the full merge run automatically
    5. Press Reset      — start over

---

## Project Structure

    src/
    ├── algorithms/
    │   ├── mergeSortedLists.ts      # Pure merge logic
    │   └── generateMergeSteps.ts   # Step-by-step engine for visualization
    ├── components/
    │   ├── MergeVisualizer.tsx      # Main orchestrator
    │   ├── PatientNode.tsx          # Single patient card
    │   ├── MergeControls.tsx        # Start / Next / Auto Play / Reset
    │   ├── ExplanationPanel.tsx     # Step explanation with pointer detail
    │   ├── LegendPanel.tsx          # Color key
    │   └── StatsPanel.tsx           # Progress bar
    ├── hooks/
    │   ├── useMergeAnimation.ts     # All merge state logic
    │   └── useAutoPlay.ts           # Interval-based auto stepping
    ├── types/
    │   ├── Patient.ts               # Patient type
    │   └── Step.ts                  # Step type
    └── data/
        └── samplePatients.ts        # Sample data for both lists

---

## Author

Mark Yosinao
