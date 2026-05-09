# 🩺 Basic Health Symmetry Analyzer

A visual + algorithmic tool that analyzes a sequence of health metrics stored in a singly linked list and determines whether the sequence is symmetrical (palindrome).

It also visualizes how the algorithm works using a slow/fast pointer traversal model.

---

# 🧠 Problem Overview

In healthcare data analysis, patient metrics such as heart rate or blood sugar are often recorded as time-series data.

This system checks whether those values form a **symmetrical pattern**, which may indicate:

- Return to baseline health conditions
- Cyclic physiological behavior
- Stability or consistency in patient state

---

# 🎯 Objective

Given a sequence of values, determine whether the linked list is a palindrome.

You must:

- Build a singly linked list
- Traverse using slow/fast pointer technique
- Detect midpoint
- Compare mirrored halves
- Output result (symmetric or not)

---

# 🧱 Data Structure

### Node Definition

Each node represents a health metric:

- `value` → numeric health metric
- `next` → pointer to next node

### Linked List

Supports:

- Sequential insertion
- Traversal
- Head reference access

---

# ⚙️ Algorithm (Core Logic)

## Step 1: Build Linked List

Convert input array into a singly linked list.

---

## Step 2: Find Midpoint (Slow/Fast Pointer)

- `slow` moves 1 step at a time
- `fast` moves 2 steps at a time

When `fast` reaches the end:

👉 `slow` is at midpoint

---

## Step 3: Reverse Second Half

Reverse nodes starting from midpoint.

---

## Step 4: Compare Halves

Compare:

- Left half (original order)
- Right half (reversed order)

If all values match → symmetric

---

# 📊 Visualization System (UI Behavior)

The UI is designed to **explain the algorithm visually**:

## 1. Input Phase

User enters values:

1,2,3,2,1

---

## 2. Traversal Phase

- Slow pointer highlights cyan
- Fast pointer highlights red
- Nodes animate step-by-step

---

## 3. Midpoint Phase

- Midpoint node is highlighted (yellow/orange)
- Split point becomes visible

---

## 4. Evaluation Phase

Final result panel appears:

### Example Output

Input: [1,2,3,2,1]  
Midpoint: 2  
Result: SYMMETRIC ✔  
Process: slow/fast traversal → midpoint detection → comparison

---

# ⏱ Complexity Analysis

## Time Complexity

O(n)

We traverse the list a constant number of times.

---

## Space Complexity

O(1)

No extra data structures are required (in-place reversal used conceptually).

---

# 🧪 Test Cases

## ✔ Normal Cases

- [1,2,3,2,1] → true
- [4,4,4,4] → true
- [10,20,30,20,10] → true

---

## ✔ Edge Cases

- [] → true (empty list is symmetric)
- [5] → true (single node)
- [1,2] → false (two different values)

---

## ✔ Non-Symmetric Case

- [1,2,3,2,8,4,9,4] → false

---

# 🧠 Key Insights

This project demonstrates:

- Linked list construction
- Two-pointer traversal technique (slow/fast pointer)
- Midpoint detection in O(n)
- Symmetry (palindrome) validation
- Algorithm visualization through UI state

---

# 🖥 How It Works (Execution Flow)

1. User inputs values
2. Linked list is constructed
3. Slow/fast pointer animation runs
4. Midpoint is detected visually
5. Second half is logically compared
6. Final evaluation panel is rendered

---

# 📌 FINAL RUN EXAMPLE

Input:
1,2,3,2,1

Output:
✔ SYMMETRIC  
Midpoint: 3  
Process: traversal → midpoint → comparison

---

# 🚀 SUMMARY

This system is a self-explaining algorithm visualizer that demonstrates:

- Slow/fast pointer traversal
- Linked list midpoint detection
- Palindrome validation
- Real-time process visualization

The output is designed so that **the data itself explains the computation without external explanation.**
