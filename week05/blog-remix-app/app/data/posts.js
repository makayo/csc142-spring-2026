export const posts = [
  {
    id: 1,
    title: "Starting with React: State, Snapshots, and My First Real Components",
    category: "Fundamentals",
    date: "March 15, 2026",
    author: "Mark Yosinao",
    summary: "How building a counter, a recipe gallery, and a task manager taught me how React actually thinks about state.",
    content: "My first React project was a counter app. Simple on the surface but it forced me to understand something fundamental: state in React is not a variable you mutate, it is a snapshot. Every time state updates, React re-renders the component with a fresh picture of the world. That mental model took a few days to really land, but once it did, everything else made sense. From there I moved into more complex state challenges. I built an Interactive Recipe Gallery that rendered dynamic lists from a data array, a User Profile app that managed nested object state, and a Task Manager that handled arrays of tasks with add, complete, and delete operations. Each project introduced a new layer of React's rendering model — how state updates are batched, how re-renders are triggered, and why you should never mutate state directly. The technologies I used across these projects were React 18, Vite, useState, JSX, and component-scoped inline CSS. These weeks were about building the foundation — learning to think in components, think in state, and think in renders before reaching for anything more complex."
  },
  {
    id: 2,
    title: "Immer and TanStack Query: When Managing State Gets Serious",
    category: "State Management",
    date: "April 5, 2026",
    author: "Mark Yosinao",
    summary: "Weeks three and four introduced immutable updates with Immer and server state with TanStack Query — two tools that permanently changed how I write React.",
    content: "Week three started with arrays in React state — one of the trickier parts of working with useState. Adding, removing, and updating items in an array without mutating the original requires a lot of map, filter, and spread syntax. It works, but it is verbose. That is where Immer came in. Immer wraps your state updates in a draft proxy, letting you write code that looks like direct mutation but produces a new immutable value under the hood. I rebuilt the Shopping List app and the User Profile app using the useImmer hook. The difference was immediate — cleaner code, fewer spread operators, and updates that were easier to read and reason about. Week four was a bigger leap: TanStack Query. Before this, I was managing server data with useEffect and useState — manually tracking loading states, error states, and stale data. TanStack Query replaced all of that with a dedicated server state layer. The useQuery hook handles fetching, caching, background refetching, and loading states automatically. The useMutation hook handles POST, PUT, PATCH, and DELETE with optimistic update support and cache synchronization via setQueryData. I built a Dog Query App using the Dog CEO API to get comfortable with useQuery, then built a full CRUD application against the JSONPlaceholder REST API — creating, reading, updating, and deleting blog posts with live API calls, optimistic UI updates, and rollback on error. The key insight: server state and client state are different problems that deserve different tools."
  },
  {
    id: 3,
    title: "React Router v7, File-Based Routing, and Building Apps With Real Pages",
    category: "Routing",
    date: "May 2, 2026",
    author: "Mark Yosinao",
    summary: "Week five introduced routing and the jump from single-page UIs to multi-page applications — including this blog.",
    content: "Week five was all about React Router v7. File-based routing was the big concept. Instead of defining routes in a central config, routes are determined by the files you create inside app/routes/. The framework maps file names to URL paths automatically. The Outlet component in the root layout renders whatever child route is currently active — giving every page a shared navbar and footer without duplicating markup. I built three routing projects. The first was adding navigation to FlavorHub — my recipe gallery from week two — turning it into a multi-page app with a home page, a filterable catalog using useSearchParams, and individual recipe detail pages at /recipe/:id using useParams. The second was this blog: a home feed, an about page, and dynamic post routes at /post/:postId using the same useParams pattern combined with useNavigate for programmatic back navigation. I also studied singly linked lists on the data structures side — building a Patient Health Record Symmetry Checker in JavaScript that used a linked list to analyze palindrome patterns. The technologies used across all week five projects were React Router v7, TypeScript, useParams, useSearchParams, useNavigate, NavLink, Link, Outlet, and file-based route configuration via @react-router/dev. What routing taught me goes beyond navigation. Every URL is a piece of application state. Designing routes first forces you to think clearly about the structure of your app before writing a single component."
  },
  {
    id: 4,
    title: "Context API, Dark Mode, and Escaping the Prop Drilling Trap",
    category: "Architecture",
    date: "May 10, 2026",
    author: "Mark Yosinao",
    summary: "Week six introduced React Context and useContext — and finally gave me a clean answer to the prop drilling problem.",
    content: "Prop drilling is one of those problems you do not fully appreciate until you have lived it. Passing a value from a top-level component down through three or four layers of children — through components that do not even use it — just to get it to the one component that does. It works, but it creates tight coupling and makes refactoring painful. Week six introduced the React Context API as the solution. Context lets you create a value at a high level in the component tree and consume it anywhere below without passing it through intermediate components. The useContext hook makes reading that value a one-liner. I built two projects to apply this. The first was a refactoring exercise — taking an existing prop-drilled component tree and replacing the prop chain with a Context provider and useContext consumers. The second was a Global Theme and Dark Mode Switcher — a context-driven toggle that changes the color scheme of the entire app from a single button anywhere in the tree. On the data structures side I studied doubly linked lists — nodes with both next and previous pointers — and built a patient records integration system that merged records from two healthcare providers using a doubly linked list. Technologies used this week: React Context API, createContext, useContext, useReducer, context providers, and JavaScript doubly linked list implementation."
  },
  {
    id: 5,
    title: "Forms, Validation, Sorting Algorithms, and useEffect Done Right",
    category: "Engineering",
    date: "May 20, 2026",
    author: "Mark Yosinao",
    summary: "Weeks seven and eight covered controlled forms, advanced validation, selection sort, and the right way to synchronize React with external systems.",
    content: "Week seven was about forms in React — specifically controlled components. A controlled input is one where React owns the value through state, rather than the DOM. Every keystroke fires a state update, every render reflects the current state. It is more explicit than uncontrolled forms, and it makes validation straightforward because you always know the current value. Advanced form validation added patterns, required fields, real-time error messages, and disabled submit states. I also tackled an E-Commerce Order Processing System — a technical exercise in using linked lists and queues to process orders in sequence, a practical data structures application with a real-world use case. Week eight shifted to useEffect — React's mechanism for synchronizing with external systems. The key insight is that effects are not just for fetching data. They are for anything that needs to sync with something outside React: timers, event listeners, third-party libraries, DOM measurements. Effect dependencies control when the effect reruns. Cleanup functions prevent memory leaks when a component unmounts or an effect reruns. On algorithms, I studied selection sort — finding the minimum element and swapping it to the front on each pass — analyzing its O(n squared) time complexity and implementing it with test cases. Technologies used: React controlled components, form state, validation patterns, useEffect, dependency arrays, cleanup functions, and selection sort in JavaScript."
  },
  {
    id: 6,
    title: "Custom Hooks, Refs, Bubble Sort, and the Shape of a Mature React App",
    category: "Advanced React",
    date: "June 1, 2026",
    author: "Mark Yosinao",
    summary: "Weeks nine and ten rounded out the picture — custom hooks, DOM refs, sorting algorithms, and CI/CD — the pieces that make React apps production-ready.",
    content: "By week nine the React fundamentals were solid. Week nine was about making code reusable at a higher level. Custom hooks let you extract stateful logic from components into standalone functions that any component can import. A useFetch hook, a useLocalStorage hook, a useDebounce hook — these are not just utilities, they are the vocabulary of a mature React codebase. useRef was the other major topic. Refs give you a mutable container that persists across renders without triggering re-renders. The main use cases: accessing DOM nodes directly, storing previous values, and managing timers without putting them in state. I studied bubble sort on the algorithms side — the classic adjacent-swap algorithm — analyzed its O(n squared) worst case and O(n) best case with early termination, and explored optimizations. Week ten closed the loop with insertion sort — building a sorted section of the array one element at a time — and an introduction to CI/CD pipelines and AWS deployment workflows. Insertion sort is particularly interesting because it is efficient for nearly-sorted data and is stable, making it practical in real scenarios unlike selection sort. The AWS modules across all eleven weeks built toward a complete cloud development picture: storage solutions, IAM security, NoSQL with DynamoDB, REST APIs with API Gateway, containerization, messaging services, serverless event-driven architectures, and automated deployment pipelines. Technologies across weeks nine and ten: custom React hooks, useRef, useCallback, useMemo, bubble sort, insertion sort, JavaScript algorithm analysis, and AWS CI/CD pipeline concepts."
  }
];
