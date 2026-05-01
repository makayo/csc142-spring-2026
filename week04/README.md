# Week 4 Dog Query App (React + Vite + TanStack Query)

## 📌 About

This project is a React application built using Vite and TanStack Query that fetches and displays dog breed data from the [Dog API](https://dogapi.dog/api/v2).

The application demonstrates how to use TanStack Query to manage server state, including handling loading, error, and success states for multiple API endpoints, fetching data on demand, and caching responses.

This project was developed as part of a Week 4 assignment to reinforce understanding of data fetching, query state management, and conditional rendering in React.

---

## 🎯 Features

- Browse a full list of dog breeds via dropdown
- View detailed breed info: name, description, life expectancy, weight range, and hypoallergenic status
- Load and toggle random dog facts
- Load and toggle breed groups displayed in a 3-column layout
- Full `isPending`, `isError`, and `isSuccess` state handling on every query
- Dark mode support via `prefers-color-scheme`

---

## 🧠 Key Concepts Demonstrated

- TanStack Query `useQuery` hook
- `isPending`, `isError`, `isSuccess` query states
- Conditional fetching with `enabled`
- Manual fetching with `refetch`
- Query caching and stale time
- Componentized layout with reusable CSS variables

---

## 🛠️ Technologies Used

- React
- Vite
- TanStack Query v5
- JavaScript (ES6+)
- HTML5
- CSS3

---

## ▶️ How to Run the Project

1. Clone the repository
```bash
git clone https://github.com/makayo/csc142-spring-2026.git
```

2. Navigate to the project folder
```bash
cd week04/dog-query-app
```

3. Install dependencies
```bash
npm install
```

4. Install TanStack Query
```bash
npm install @tanstack/react-query
```

5. Start the development server
```bash
npm run dev
```

6. Open the application in your browser
```
http://localhost:5173/
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── dogApi.js       # Fetch functions for all API endpoints
├── App.css             # Component styles using CSS variables
├── App.jsx             # Main app component
├── index.css           # Global styles and CSS variables
└── main.jsx            # App entry point with QueryClientProvider
```

---

## 🧪 Test Cases

This application was tested using 3 normal cases and 3 edge cases to validate TanStack Query behavior, conditional rendering, and API response handling.

---

### ✅ Normal Test Cases

🟢 **Normal Case 1: Breed List Loads on Start**

Steps:
- Open the application in the browser

Expected Result:
- Dropdown renders with a full list of dog breeds

Pass Condition: ✔ Breeds populate the dropdown automatically on load

---

🟢 **Normal Case 2: Select a Breed Shows Detail Card**

Steps:
- Open the application
- Select any breed from the dropdown

Expected Result:
- Breed card appears with name, description, life expectancy min/max, weight min/max, and hypoallergenic status

Pass Condition: ✔ Breed detail card renders correctly with all attributes

---

🟢 **Normal Case 3: Facts and Groups Load on Button Click**

Steps:
- Click the **facts** button
- Click the **groups** button

Expected Result:
- Facts panel appears with a list of dog facts
- Groups panel appears below with breed groups in a 3-column layout

Pass Condition: ✔ Both panels render their data correctly after clicking

---

### ⚠️ Edge Test Cases

🟡 **Edge Case 1: Breed With Missing Description**

Steps:
- Select a breed that has no description in the API response

Expected Result:
- Card displays `"No description available."` instead of a blank field

Actual Result:
- `"No description available."` renders correctly

✔ Fallback text prevents empty UI

---

🟡 **Edge Case 2: Breed With Missing Life or Weight Data**

Steps:
- Select a breed where life expectancy or weight data is absent from the API response

Expected Result:
- Attribute fields display `"—"` instead of crashing or showing `undefined`

Actual Result:
- `"—"` renders in place of missing data

✔ Optional chaining and fallback values prevent runtime errors

---

🟡 **Edge Case 3: Network Failure on Fetch**

Steps:
- Open DevTools → Network tab → set to Offline
- Reload the app or click facts/groups

Expected Result:
- Error message displays: `"Failed to load breeds."` / `"Failed to load facts."` / `"Failed to load groups."`

Actual Result:
- Error messages render correctly for each failed query

✔ `isError` state correctly surfaces API failures to the user

---

## 🔗 API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /api/v2/breeds` | Fetch all dog breeds |
| `GET /api/v2/breeds/:id` | Fetch details for a specific breed |
| `GET /api/v2/facts` | Fetch random dog facts |
| `GET /api/v2/groups` | Fetch breed groups |

---

## 📊 Summary

This project demonstrates how TanStack Query manages server state in React, including automatic fetching, manual on-demand fetching, caching, and graceful error handling. The test cases validate both expected functionality and edge cases, highlighting how `isPending`, `isError`, and `isSuccess` states work together to create a reliable user experience.

---

## 👨‍💻 Author

MARK YOSINAO