# Recipe & Interactive Dessert Gallery

## Overview

This project includes two React gallery components built with Vite:

- A **Recipe Gallery** that displays multiple recipes using a card-based layout
- An **Interactive Dessert Gallery** that displays one image at a time with navigation controls

The Recipe Gallery shows:

- Images
- Titles
- Ingredient lists

The gallery is divided into two sections:

- Recipe Gallery (Recipes 1–3)
- Island Style Food (Recipes 4–6)

The Interactive Dessert Gallery demonstrates:

- Single-image display
- Next/Previous navigation
- Boundary checks to prevent invalid navigation

---

## Concepts Demonstrated

### Recipe Gallery

- React components
- Array mapping with `.map()`
- JSX rendering
- Responsive CSS Grid layout
- Static asset handling via `public/` folder

### Interactive Dessert Gallery

- React state management (`useState`)
- Index-based navigation
- Conditional rendering
- Boundary protection logic
- Dynamic UI updates based on state

---

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS Grid / Flexbox

---

## Project Structure

```
interactive-recipe-gallery/
│
├── public/
│   └── gallery/
│       ├── id1_spaghetti.jpg
│       ├── id2_curry.jpg
│       ├── id3_avocado.jfif
│       ├── id4_adobo.jpg
│       ├── id5_dinuguan.jpg
│       ├── id6_kelaguen.webp
│       ├── cheesecake.webp
│       ├── chocolate-lava-cake.png
│       ├── tiramisu.jpg
│       └── vanilla-ice-cream-delight-caramel-drizzle.jpg
│
├── src/
│   ├── RecipeGallery.jsx
│   ├── RecipeGallery.css
│   ├── InteractiveGallery.jsx
│   ├── InteractiveGallery.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
└── README.md
```

---

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open the browser at:

```
http://localhost:5173/
```

---

## Features

### Recipe Cards

Each recipe card includes:

- An image
- A title
- A list of ingredients

---

### Dynamic Rendering

Recipes are rendered using:

```js
recipes.map();
```

Each card includes a unique key:

```jsx
key={recipe.id}
```

---

### Responsive Layout

- Built using CSS Grid
- Automatically adjusts columns based on screen size
- Cards stack vertically on smaller screens

---

### Organized Sections

- Recipe Gallery (IDs 1–3)
- Island Style Food (IDs 4–6)

---

## Interactive Dessert Gallery

### Objective

- Display images from a predefined list
- Navigate using Next and Previous buttons
- Prevent out-of-bounds navigation

---

### Component Logic

#### State Management

```jsx
const [index, setIndex] = useState(0);
const current = images[index];
```

---

#### Navigation

```jsx
const goNext = () => {
  if (index < images.length - 1) {
    setIndex(index + 1);
  }
};

const goPrev = () => {
  if (index > 0) {
    setIndex(index - 1);
  }
};
```

---

### Boundary Protection

- Prevents going past last image
- Prevents going before first image
- Buttons disable automatically based on position

---

### UI Behavior

- Displays current image
- Shows description
- Shows position indicator (e.g., 2 / 5)
- Updates dynamically on navigation

---

## Styling

All styling is handled in:

```
src/RecipeGallery.css
src/InteractiveGallery.css
src/App.css
src/index.css
```

Includes:

- Grid layouts
- Card shadows and borders
- Responsive behavior
- Centered dessert gallery layout

---

## Image Handling

Images are stored in:

```
public/gallery/
```

Referenced in JSX as:

```jsx
image: "/gallery/id1_spaghetti.jpg";
```

This keeps asset handling simple and avoids bundler issues.

---

## Test Cases

### Normal Test Cases — Recipe Gallery

#### Test Case 1 — Rendering All Recipes

Input: Load RecipeGallery with 6 recipes

Expected:

- All 6 recipes render
- IDs 1–3 under Recipe Gallery
- IDs 4–6 under Island Style Food

Result: Passed

---

#### Test Case 2 — Image Loading

Expected:

- All images load correctly
- No broken links

Result: Passed

---

#### Test Case 3 — Responsive Layout

Expected:

- Grid adapts
- Cards stack on small screens

Result: Passed

---

### Normal Test Cases — Interactive Gallery

#### Test Case 1 — Initial Render

Expected:

- First image displayed
- Previous disabled
- Next enabled

---

#### Test Case 2 — Navigation

Expected:

- Index updates correctly
- Buttons disable at boundaries

---

#### Test Case 3 — Boundary Protection

Expected:

- No index overflow
- No errors

---

### Edge Case Test Cases — Recipe Gallery

#### Empty Recipe List

Expected: No crash, no rendering

---

#### Missing Image Field

Expected: Card still renders with broken image icon

---

#### Missing Ingredients

Expected: Card renders with missing data handled safely

---

### Edge Case Test Cases — Interactive Gallery

#### Empty Image List

Expected:

- Fallback message
- No navigation buttons

---

#### Missing Image Source

Expected:

- Broken image icon
- App remains stable

---

## Summary

- All normal test cases passed
- All edge cases handled safely
- Both galleries are stable, responsive, and production-ready
