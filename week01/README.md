# Week 1 Counter (4 types)
---
# 🎥 Demo Video

Watch the live demo of the Week 1 Counter App:

https://your-youtube-link-here
---

# 🧪 3 NORMAL TEST CASES (Expected Behavior)

These are “happy path” scenarios — everything works as intended.

---

## 🟢 Normal Case 1: Basic Increment

**Steps:**
- Load app  
- Ensure count = 0  
- Click **Increment**

**Expected Result:**
0 → 1


**Pass Condition:**
✔ Count increases by 1 per click

---

## 🟢 Normal Case 2: Increment After Delay

**Steps:**
- Set count = 0  
- Click **Increment After Delay**  
- Wait 2 seconds  

**Expected Result:**
0 → 1 (after 2 seconds)


**Pass Condition:**
✔ State updates asynchronously after delay

---

## 🟢 Normal Case 3: Correct Increment Twice

**Steps:**
- Set count = 0  
- Click **Correct Increment Twice**

**Expected Result:**
0 → 2


**Pass Condition:**
✔ Functional updater correctly applies both increments

---

# ⚠️ 3 EDGE TEST CASES

These are designed to expose React behavior (batching, snapshots, async behavior).

---

## 🟡 Edge Case 1: Increment Twice (Batching Bug)

**Steps:**
- Set count = 0  
- Click **Increment Twice (Wrong)** ONCE  

**Expected (what user thinks):**
0 → 2

**Actual Result:**
0 → 1


**Why:**
- React batches updates
- Both updates use the same snapshot value

✔ Demonstrates state snapshot behavior

---

## 🟡 Edge Case 2: Rapid Clicking Increment Button

**Steps:**
- Click **Increment** 5 times quickly  

**Expected Result:**
0 → 5

**Actual Result:**
0 → 5


**Why:**
- Each click is a separate event
- Each triggers a fresh render

✔ Demonstrates independent state updates

---

## 🟡 Edge Case 3: Async + Sync Overlap

**Steps:**
- Click **Increment After Delay**  
- Immediately click **Increment**

**Expected Result:**
0 → 2 (after delay resolves)

**Actual Result:**
0 → 2


**Why:**
- Timeout uses captured snapshot
- Sync click uses current state
- Both updates resolve independently

✔ Demonstrates async state + snapshot interaction

---

# 🧪 TEST SUMMARY

This application was tested using **3 normal cases** and **3 edge cases** to validate React state behavior, batching, and asynchronous updates.

---

## Normal Cases:
- Increment updates state by +1  
- Increment After Delay updates state asynchronously after 2 seconds  
- Correct Increment Twice properly increments state by +2 using functional updates  

---

## Edge Cases:
- Increment Twice (Wrong) demonstrates React batching and snapshot behavior resulting in +1 instead of +2  
- Rapid clicking shows independent state updates per event  
- Async + sync interaction shows how delayed and immediate updates combine correctly  
