# Recipe Gallery

## Overview

This project is a simple React recipe gallery built with Vite. It displays a collection of recipes using a card-based layout, including:

- Images
- Titles
- Ingredient lists

The gallery is divided into two sections:

- Recipe Gallery (Recipes 1–3)
- Island Style Food (Recipes 4–6)

## Concepts Demonstrated

- React components
- Array mapping using `.map()`
- JSX rendering
- Responsive layout using CSS Grid
- Static image handling via the `public/` folder

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS Grid / Flexbox

## Project Structure

```
recipe-gallery/
│
├── public/
│   └── gallery/
│       ├── id1_spaghetti.jpg
│       ├── id2_curry.jpg
│       ├── id3_avocado.jfif
│       ├── id4_adobo.jpg
│       ├── id5_dinuguan.jpg
│       └── id6_kelaguen.webp
│
├── src/
│   ├── RecipeGallery.jsx
│   ├── RecipeGallery.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
└── README.md
```

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open the browser at the local URL provided by Vite (example: http://localhost:5173/).

## Features

### Recipe Cards

Each recipe card includes:

- An image
- A title
- A list of ingredients

### Dynamic Rendering

Recipes are rendered using:

```js
recipes.map()
```

Each card uses:

```jsx
key={recipe.id}
```

to satisfy React’s key requirement.

### Responsive Layout

- Implemented using CSS Grid
- Automatically adjusts the number of columns based on screen size
- Cards stack vertically on smaller screens

### Organized Sections

Recipes are grouped into:

- Recipe Gallery (IDs 1–3)
- Island Style Food (IDs 4–6)

## Styling

All layout and styling is handled in:

```
src/RecipeGallery.css
```

Includes:

- Grid layout
- Card borders and shadows
- Hover effects
- Responsive behavior

## Image Handling

Images are stored in:

```
public/gallery/
```

Referenced directly in JSX:

```jsx
image: "/gallery/id1_spaghetti.jpg"
```

This avoids bundler issues and keeps image paths simple.

## Test Cases

### Normal Test Cases

#### Test Case 1 — Rendering All Recipes

Input: Load the RecipeGallery component with the full recipes array (6 items).

Expected:
- All 6 recipes appear
- IDs 1–3 appear under Recipe Gallery
- IDs 4–6 appear under Island Style Food

Result: All recipes render correctly.

#### Test Case 2 — Images Load Correctly

Input: Each recipe card loads its image from `/gallery/...`

Expected:
- All images display without broken links
- Images scale properly

Result: All images load successfully.

#### Test Case 3 — Responsive Layout

Input: Resize the browser window.

Expected:
- Grid adjusts columns
- Cards stack vertically on small screens

Result: Layout responds smoothly.

### Edge Case Test Cases

#### Edge Case 1 — Empty Recipe List

Input:

```js
recipes = []
```

Expected:
- No cards render
- No console errors

Result: Component renders gracefully.

#### Edge Case 2 — Missing Image Path

Input: Remove the `image` field from one recipe.

Expected:
- Card still renders
- `<img>` shows a broken icon
- App does not crash

Result: Component continues rendering.

#### Edge Case 3 — Missing Ingredients Array

Input: Remove the `ingredients` field.

Expected:
- Gallery still renders
- Affected card shows missing data

Result: Component renders without errors.

## Summary

All normal and edge test cases passed successfully. The gallery handles expected inputs and gracefully tolerates missing or incomplete data.
