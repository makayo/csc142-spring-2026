# 🩺 Health Symmetry Analyzer

A visual algorithm tool that analyzes a sequence of health metrics stored in a singly linked list and determines whether the sequence is symmetrical.

> **Note:** This is a simulated visualization tool built to demonstrate linked list palindrome detection. It uses health metrics as sample data to represent a real-world use case — it is not a clinical application.

---

## 🧠 Overview

This tool takes a sequence of numeric values and checks whether they form a palindrome — reading the same forwards and backwards.

It visualizes the algorithm step-by-step so the computation is self-explanatory without external documentation.

---

## 🎯 What It Does

- Builds a singly linked list from user input
- Traverses it using the slow/fast pointer technique
- Detects the midpoint visually
- Compares both halves
- Outputs the result with a real-time step log
- **Switch between two algorithm implementations** — Original O(n) space and Optimized O(1) space

---

## 🧱 Data Structure

### Node

Each node holds:

- `value` → numeric health metric
- `next` → pointer to the next node

### Linked List

Supports:

- Sequential insertion via `append()`
- Head reference access
- Full traversal

---

## ⚙️ Algorithm

### Step 1 — Build the List

Convert input values into a singly linked list.

### Step 2 — Find the Midpoint

Use the slow/fast pointer technique:

- `slow` moves 1 step at a time
- `fast` moves 2 steps at a time

When `fast` reaches the end → `slow` is at the midpoint.

### Step 3 — Compare Both Halves

Two pointers walk inward from both ends.
If every pair matches → **symmetric**.
If any pair fails → **not symmetric**.

---

## 🔁 Algorithm Toggle

Two implementations are available and switchable in the UI:

### Original — O(n) Space

```js
function isSymmetricFromArray(arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    if (arr[l] !== arr[r]) return false;
    l++;
    r--;
  }
  return true;
}
```

- Copies linked list values into an array
- Two pointer comparison on the array
- Easier to read and reason about
- **Time: O(n) · Space: O(n)**

---

### Optimized — O(1) Space

```js
function isSymmetricOptimized(head) {
  // find midpoint
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // reverse second half in place
  let prev = null,
    curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // compare both halves
  let left = head,
    right = prev;
  while (right) {
    if (left.value !== right.value) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
```

- No extra array — works directly on the linked list
- Reverses the second half in place
- Same result, less memory
- **Time: O(n) · Space: O(1)**

> **Trade-off:** The original list is temporarily mutated during comparison. To fully restore it, reverse the second half again after the check.

---

## 📊 Visualization

### Traversal Phase

- **Cyan** → slow pointer
- **Red** → fast pointer
- Nodes animate step by step

### Midpoint Phase

- **Yellow** → midpoint node highlighted

### Evaluation Phase

Real step log displayed:

**Original — O(n) space**

```
Algorithm: Original — O(n) space
Input: [1, 2, 3, 2, 1]
Midpoint: 3
Result: SYMMETRIC ✔
Process:
  Step 1: slow → [2]  fast → [3]
  Step 2: slow → [3]  fast → [1]
  → Midpoint detected: [3]
  → Full comparison: all pairs matched ✔
O(n) time · O(n) space · array copy used for comparison
```

**Optimized — O(1) space**

```
Algorithm: Optimized — O(1) space
Input: [1, 2, 3, 2, 1]
Midpoint: 3
Result: SYMMETRIC ✔
Process:
  Step 1: slow → [2]  fast → [3]
  Step 2: slow → [3]  fast → [1]
  → Midpoint detected: [3]
  → Full comparison: all pairs matched ✔
O(n) time · O(1) space · in-place reversal — no extra array
```

---

## ⏱ Complexity

### Original Solution

|       | Complexity | Reason                                     |
| ----- | ---------- | ------------------------------------------ |
| Time  | O(n)       | Two linear passes — traversal + comparison |
| Space | O(n)       | Values copied into array for comparison    |

### Optimized Solution

|       | Complexity | Reason                                            |
| ----- | ---------- | ------------------------------------------------- |
| Time  | O(n)       | Two linear passes — traversal + in-place reversal |
| Space | O(1)       | No extra array — second half reversed in place    |

---

## 🧪 Test Cases

### ✔ Symmetric

| Input (copy-paste)   | Midpoint | Result      |
| -------------------- | -------- | ----------- |
| `1, 2, 3, 2, 1`      | 3        | SYMMETRIC ✔ |
| `4, 4, 4, 4`         | 4        | SYMMETRIC ✔ |
| `10, 20, 30, 20, 10` | 30       | SYMMETRIC ✔ |

### ✔ Edge Cases

| Input (copy-paste) | Result          | Reason              |
| ------------------ | --------------- | ------------------- |
| `5`                | SYMMETRIC ✔     | Single node         |
| `7, 7`             | SYMMETRIC ✔     | Two equal nodes     |
| `1, 2`             | NOT SYMMETRIC ✖ | Two different nodes |

### ✖ Not Symmetric

| Input (copy-paste) | Midpoint | Result          |
| ------------------ | -------- | --------------- |
| `1, 2, 3, 2, 8`    | 3        | NOT SYMMETRIC ✖ |
| `9, 5, 2, 5, 8`    | 2        | NOT SYMMETRIC ✖ |

---

## 🖥 How to Run

1. Clone the repo
2. Open `index.html` in a browser
3. Enter comma-separated values in the input field
4. Select **Original** or **Optimized** algorithm using the toggle
5. Click **Run Analysis**
6. Watch the traversal animate and the result render
7. Switch algorithms and run again to compare

---

## 🚀 Summary

This tool demonstrates:

- Singly linked list construction
- Slow/fast pointer traversal
- Midpoint detection in O(n)
- Palindrome validation
- Real-time step-by-step visualization
- Side-by-side algorithm comparison — O(n) space vs O(1) space

Built with vanilla HTML, CSS, and JavaScript — no frameworks or dependencies.

---

## 👨‍💻 Author

**Mark Yosinao**
