# HealthMerge Patient Record Integration Visualizer

## Overview
This project visualizes the process of merging two sorted patient record lists using a step-by-step two-pointer algorithm.

It demonstrates:
- Merge of two sorted linked lists
- Live SSN comparison
- Step-by-step execution visualization
- Educational explanation of pointer movement

---

## Algorithm (Core Logic)

We use a two-pointer approach:

1. Compare A[i] and B[j]
2. If A[i] < B[j] → take A[i]
3. If B[j] < A[i] → take B[j]
4. If equal → take one, move both pointers
5. Continue until both lists are fully processed

---

## Complexity

Time Complexity: O(n + m)  
Space Complexity: O(n + m)

---

## How to Run

npm install  
npm run dev  

Open: http://localhost:5173

---

## Test Coverage

- 3 normal cases
- 3 edge cases
- duplicate handling
- empty list handling
