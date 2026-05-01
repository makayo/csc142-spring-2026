# Week 4 CRUD Query App (React + Vite + TanStack Query)

## 📌 About

This project is a React application built using Vite and TanStack Query that performs full CRUD operations against the [JSONPlaceholder API](https://jsonplaceholder.typicode.com).

The application demonstrates how to use TanStack Query to manage server state for both read and write operations, including fetching posts, creating new entries, fully replacing existing ones, partially updating fields, and deleting records — all with optimistic UI updates and cache synchronization.

---

## 🎯 Features

- Fetch and display all 100 posts from JSONPlaceholder
- Filter posts by User ID via input or quick-select pills
- Create a new post with title, body, and user ID via a modal form
- Fully replace a post's title and body using a PUT request
- Partially update only a post's title using a PATCH request
- Delete a post with optimistic removal from the UI
- Full `isPending`, `isError`, and `isSuccess` state handling on every query and mutation

---

## 🧠 Key Concepts Demonstrated

- TanStack Query `useQuery` hook for data fetching
- TanStack Query `useMutation` hook for POST, PUT, PATCH, DELETE
- Optimistic updates with `onMutate` and cache rollback with `onError`
- Manual cache updates with `setQueryData`
- Dynamic query keys for filtered fetching
- Query cancellation before optimistic updates

---

## 🛠️ Technologies Used

- React
- Vite
- TanStack Query v5
- JavaScript (ES6+)
- HTML5
- CSS3 (inline styles via component-scoped style objects)

---

## ▶️ How to Run the Project

1. Clone the repository
```bash
git clone https://github.com/makayo/csc142-spring-2026.git
```

2. Navigate to the project folder
```bash
cd week04/crud-query-app
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
│   └── posts.js              # Fetch functions for all API operations
├── hooks/
│   └── usePosts.js           # TanStack Query hooks (useQuery + useMutation)
├── components/
│   ├── PostCard.jsx          # Individual post card with Edit, Rename, Delete actions
│   ├── FilterBar.jsx         # User ID filter input and quick-select pills
│   ├── CreatePostModal.jsx   # Modal form for POST request
│   ├── EditPostModal.jsx     # Modal form for PUT request
│   └── PatchModal.jsx        # Modal dialog for PATCH request
├── App.jsx                   # Main app component
├── index.css                 # Global styles
└── main.jsx                  # App entry point with QueryClientProvider
```
---

## 🧪 Test Cases

This application was tested using 3 normal cases and 3 edge cases to validate TanStack Query behavior, mutation handling, optimistic updates, and API response handling.

---

### ✅ Normal Test Cases

🟢 Normal Case 1: Posts Load on Start

Steps:
- Open the application in the browser

Expected Result:
- All 100 posts render in a list with ID badge, user ID, title, and body

Pass Condition: ✔ Posts populate the list automatically on load

---

🟢 Normal Case 2: Create a New Post

Steps:
- Click the + New Post button
- Fill in the title, body, and user ID fields
- Click Publish

Expected Result:
- Modal closes and the new post appears at the top of the list

Pass Condition: ✔ New post is prepended to the list via cache update

---

🟢 Normal Case 3: Filter Posts by User ID

Steps:
- Click any quick-select pill (e.g. User 2) or type a user ID and click Go

Expected Result:
- List updates to show only posts belonging to that user ID

Pass Condition: ✔ Filtered posts render correctly based on the selected user ID

---

### ⚠️ Edge Test Cases

🟡 Edge Case 1: Submit New Post Form With Empty Fields

Steps:
- Click + New Post
- Leave the title or body blank
- Try to click Publish

Expected Result:
- Publish button stays dimmed and nothing is submitted

Actual Result:
- Button is unclickable when required fields are empty

✔ Validation prevents incomplete POST requests

---

🟡 Edge Case 2: Filter by a User ID With No Results

Steps:
- Type 999 in the filter input and click Go

Expected Result:
- Empty state message appears indicating no posts were found for that user

Actual Result:
- Empty state renders correctly with no errors or crashes

✔ Empty query result is handled gracefully without breaking the UI

---

🟡 Edge Case 3: Rename a Post With an Empty Title

Steps:
- Click Rename on any post
- Clear out the entire title field so it is empty
- Try to click Rename

Expected Result:
- Rename button stays dimmed and no request is sent

Actual Result:
- Button remains disabled until at least one character is typed

✔ Validation prevents empty PATCH requests from being submitted

---

## 🔗 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /posts | Fetch all posts |
| GET | /posts?userId=N | Fetch posts filtered by user ID |
| POST | /posts | Create a new post |
| PUT | /posts/:id | Fully replace a post |
| PATCH | /posts/:id | Partially update a post's title |
| DELETE | /posts/:id | Delete a post |

---

## 📊 Summary

This project demonstrates how TanStack Query manages both server reads and writes in React. Using useQuery for fetching and useMutation for all write operations, the app maintains a responsive UI through optimistic updates, cache manipulation, and graceful error handling. The test cases validate both expected user flows and edge conditions including empty states and disabled form submission validation.

---

## 👨‍💻 Author

MARK YOSINAO