# TheFeed — Developer Blog (React Router + Vite)

## About

TheFeed is a multi-page developer blog built with React Router v7 and Vite. It showcases a home feed of posts, an about page, and dynamic individual post views — all navigated through client-side routing without a full page reload.

The blog documents a real development journey across ten weeks of building with React, covering state management, server state, routing, context, forms, algorithms, and custom hooks.

---

## Features

- Home feed listing all blog posts with category badges, dates, and summaries
- Dynamic post detail pages at /post/:postId loaded via useParams
- About page describing the blog and its tech stack
- Persistent navbar with active link highlighting via NavLink
- Programmatic back navigation using the useNavigate hook
- Shared root layout using the Outlet pattern
- Not found fallback for invalid post IDs

---

## Key Concepts Demonstrated

- React Router v7 file-based routing via @react-router/dev
- Outlet pattern for persistent layout across all routes
- useParams hook for reading dynamic URL segments
- useNavigate hook for programmatic navigation
- NavLink for active route styling
- Static data module imported across route components
- TypeScript throughout all route and layout files

---

## Technologies Used

- React 18
- React Router v7
- TypeScript
- Vite
- JavaScript ES Modules
- Inline CSS via component-scoped style objects

---

## How to Run the Project

1. Clone the repository

    git clone https://github.com/makayo/csc142-spring-2026.git

2. Navigate to the project folder

    cd week05/blog-remix-app

3. Install dependencies

    npm install

4. Start the development server

    npm run dev

5. Open the application in your browser

    http://localhost:5173/

---

## Project Structure

    app/
    ├── data/
    │   └── posts.js              # Blog post data — id, title, category, date, author, summary, content
    ├── routes/
    │   ├── _index.tsx            # Home feed — list of all posts with category and date
    │   ├── about.tsx             # About page — blog description and tech stack
    │   └── post.$postId.tsx      # Dynamic post view — full content loaded by ID
    ├── routes.ts                 # Route config — index, about, post/:postId
    ├── root.tsx                  # Root layout — navbar, outlet, footer
    └── app.css                   # Global base styles

---

## Routes

| Path          | Component        | Description                           |
|---------------|------------------|---------------------------------------|
| /             | _index.tsx       | Home feed — all posts listed          |
| /about        | about.tsx        | About page — blog and author info     |
| /post/:postId | post.$postId.tsx | Dynamic post detail page loaded by ID |

---

## Post Data Structure

Each post in app/data/posts.js follows this shape:

    {
      id: number,
      title: string,
      category: string,
      date: string,
      author: string,
      summary: string,
      content: string
    }

---

## Blog Posts

| # | Title | Category |
|---|-------|----------|
| 1 | Starting with React: State, Snapshots, and My First Real Components | Fundamentals |
| 2 | Immer and TanStack Query: When Managing State Gets Serious | State Management |
| 3 | React Router v7, File-Based Routing, and Building Apps With Real Pages | Routing |
| 4 | Context API, Dark Mode, and Escaping the Prop Drilling Trap | Architecture |
| 5 | Forms, Validation, Sorting Algorithms, and useEffect Done Right | Engineering |
| 6 | Custom Hooks, Refs, Bubble Sort, and the Shape of a Mature React App | Advanced React |

---

## Test Cases

This application was tested using 3 normal cases and 3 edge cases to validate React Router navigation, dynamic routing, and error handling.

---

### Normal Test Cases

Normal Case 1: Home Feed Loads All Posts

Steps:
- Open the application at http://localhost:5173/

Expected Result:
- All 6 blog posts render in the feed with title, category badge, date, and summary
- Each post shows a Read more link

Pass Condition: Home feed renders all posts without errors

---

Normal Case 2: Clicking a Post Navigates to the Detail Page

Steps:
- On the home feed click any post title or Read more link

Expected Result:
- Browser navigates to /post/1 or the corresponding post ID
- Full post title, category, date, author avatar, summary, and content render correctly
- Return to Feed button is visible at the top

Pass Condition: Post detail page renders complete content and URL updates correctly

---

Normal Case 3: Return to Feed Button Navigates Back

Steps:
- Navigate to any post detail page
- Click the Return to Feed button

Expected Result:
- useNavigate sends the user back to the home feed at /
- All posts are visible again in the feed

Pass Condition: Programmatic navigation with useNavigate works correctly

---

### Edge Test Cases

Edge Case 1: Invalid Post ID in URL

Steps:
- Manually type an invalid URL in the browser: http://localhost:5173/post/999

Expected Result:
- Page renders a Post not found message
- A Back to Feed link is displayed for recovery

Actual Result:
- Not found state renders cleanly without crashing the app

Pass Condition: Invalid route parameter handled gracefully without blank screen or error

---

Edge Case 2: Direct URL Navigation to a Specific Post

Steps:
- Paste http://localhost:5173/post/3 directly into the browser address bar

Expected Result:
- Post detail page loads immediately for post ID 3
- useParams reads the postId from the URL without any interaction

Actual Result:
- Correct post loads on direct URL navigation and page refresh

Pass Condition: Dynamic routing works on direct URL access without requiring home page navigation first

---

Edge Case 3: About Page Accessible from Any Route

Steps:
- Navigate to a post detail page at /post/1
- Click the About link in the navbar

Expected Result:
- Browser navigates to /about
- About page renders with blog description and tech stack
- Navbar highlights About as the active link

Actual Result:
- NavLink active styling applies correctly and About page renders from any starting route

Pass Condition: Persistent layout and navbar work correctly regardless of current route

---

## Summary

TheFeed demonstrates how React Router v7 enables clean multi-page navigation in a React application. Using file-based routing, the Outlet pattern for shared layouts, useParams for dynamic post loading, and useNavigate for programmatic navigation, the app delivers a functional blog experience. The test cases validate normal navigation flows and edge conditions including invalid post IDs, direct URL access, and cross-route navbar behavior.

---

## Author

Mark Yosinao
