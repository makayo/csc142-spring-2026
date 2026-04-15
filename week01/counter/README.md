# Week 1 Counter Application (React + Vite)

## 📌 About

This project is a simple React application built using Vite that demonstrates core concepts of React state management.

The application includes a counter with four different behaviors designed to illustrate how React handles state updates, including synchronous updates, asynchronous updates, batching, and the concept of state as a snapshot.

This project was developed as part of a Week 1 assignment to reinforce understanding of the `useState` Hook and React rendering behavior.

---

## 🎯 Features

- Increment counter by 1
- Increment counter after a 2-second delay
- Demonstrate incorrect state updates due to batching
- Demonstrate correct state updates using functional updates

---

## 🧠 Key Concepts Demonstrated

- React `useState` Hook
- State as a snapshot
- Batching of state updates
- Functional state updates
- Asynchronous updates using `setTimeout`

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

---

## ▶️ How to Run the Project

1. Clone the repository

```bash
git clone https://github.com/your-username/wk1-counter.git
```

2. Navigate to the project folder

```bash
cd wk1-counter
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open the application in your browser

```
http://localhost:5173/
```

---

## 🧪 Test Cases

This application was tested using **3 normal cases** and **3 edge cases** to validate React state behavior, batching, and asynchronous updates.

---

### ✅ Normal Test Cases

#### 🟢 Normal Case 1: Basic Increment

**Steps:**

- Load the application
- Ensure count = 0
- Click **Increment**

**Expected Result:**

```
0 → 1
```

**Pass Condition:**
✔ Count increases by 1 per click

---

#### 🟢 Normal Case 2: Increment After Delay

**Steps:**

- Set count = 0
- Click **Increment After Delay**
- Wait 2 seconds

**Expected Result:**

```
0 → 1 (after 2 seconds)
```

**Pass Condition:**
✔ State updates asynchronously after delay

---

#### 🟢 Normal Case 3: Correct Increment Twice

**Steps:**

- Set count = 0
- Click **Correct Increment Twice**

**Expected Result:**

```
0 → 2
```

**Pass Condition:**
✔ Functional updater correctly applies both increments

---

### ⚠️ Edge Test Cases

#### 🟡 Edge Case 1: Increment Twice (Batching Behavior)

**Steps:**

- Set count = 0
- Click **Increment Twice (Wrong)** once

**Expected (User Expectation):**

```
0 → 2
```

**Actual Result:**

```
0 → 1
```

**Explanation:**

- React batches state updates within the same event
- Both updates use the same snapshot value

✔ Demonstrates state snapshot behavior

---

#### 🟡 Edge Case 2: Rapid Clicking Increment Button

**Steps:**

- Click **Increment** 5 times quickly

**Expected Result:**

```
0 → 5
```

**Actual Result:**

```
0 → 5
```

**Explanation:**

- Each click is a separate event
- Each triggers a fresh render

✔ Demonstrates independent state updates

---

#### 🟡 Edge Case 3: Async State Override (Delay vs Immediate Update Race Condition)

**Steps:**

- Set count = 0
- Click **Increment After Delay**
- Immediately click **Correct Increment Twice**

---

**What happens in order:**

1. After clicking **Increment After Delay**, a delayed update is scheduled:

   ```
   (0 → 1 after 2 seconds)
   ```

2. Immediately clicking **Correct Increment Twice** updates state:

   ```
   0 → 2
   ```

3. When the delayed update runs, it uses a **stale snapshot (0)** and applies:
   ```
   0 → 1
   ```

---

**Actual Result Timeline:**

```
0 → 2 → 1
```

---

**Expected Intuitive Result:**

```
0 → 3
```

---

**Explanation:**

- The `setTimeout` callback captures the initial state value (snapshot = 0)
- The immediate update correctly sets state to 2 using functional updates
- When the delayed update executes, it ignores the newer state and applies its old snapshot
- This causes the delayed update to overwrite the newer value

### Key Takeaways

- Demonstrates a race condition between asynchronous state updates and synchronous updates
- Shows how stale closures (snapshots) can overwrite newer state in React

### 🎥 Demo

(Add your video link or GIF here)

[https://your-demo-link-here](https://youtu.be/8JPJuzk6hCA)

---

## 📊 Summary

This project demonstrates how React manages state using `useState`, including important behaviors such as batching and snapshot-based updates.

The test cases validate both expected functionality and edge cases, highlighting how improper state updates can lead to unexpected results and how functional updates resolve these issues.

---

## 👨‍💻 Author

MARK YOSINAO
