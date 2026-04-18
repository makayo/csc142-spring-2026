📘 Recipe Gallery — README
📌 Overview
This project is a simple React recipe gallery built with Vite. It displays a collection of recipes using a card‑based layout, including images, titles, and ingredient lists. The gallery is divided into two sections:

Recipe Gallery (recipes 1–3)

Island Style Food (recipes 4–6)

The project demonstrates:

React components

Array mapping

JSX rendering

Responsive layout using CSS Grid

Static image handling via the public/ folder

🛠️ Technologies Used
React

Vite

JavaScript (ES6+)

CSS Grid / Flexbox

Public folder static assets

📂 Project Structure
Code
recipe-gallery/
│
├── public/
│ └── gallery/
│ ├── id1_spaghetti.jpg
│ ├── id2_curry.jpg
│ ├── id3_avocado.jfif
│ ├── id4_adobo.jpg
│ ├── id5\_\_dinuguan.jpg
│ └── id6_kelaguen.webp
│
├── src/
│ ├── RecipeGallery.jsx
│ ├── RecipeGallery.css
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
│
└── README.md
🚀 Running the Project

1. Install dependencies
   Code
   npm install
2. Start the development server
   Code
   npm run dev
3. Open in browser
   Vite will display a local URL such as:

Code
http://localhost:5173/
🖼️ Features
✔ Recipe Cards
Each recipe is displayed as a card containing:

An image

A title

A list of ingredients

✔ Dynamic Rendering
The component uses:

js
recipes.map()
to generate JSX for each recipe card.

✔ Unique Keys
Each card uses:

jsx
key={recipe.id}
to satisfy React’s key requirement.

✔ Responsive Layout
The gallery uses CSS Grid to automatically adjust the number of columns based on screen size.

✔ Organized Sections
Recipes are grouped into:

Main Recipe Gallery (IDs 1–3)

Island Style Food (IDs 4–6)

🎨 Styling
All layout and card styling is handled in:

Code
src/RecipeGallery.css
This includes:

Grid layout

Card borders and shadows

Hover effects

Responsive behavior

📁 Image Handling
All images are stored in:

Code
public/gallery/
and referenced directly in JSX:

jsx
image: "/gallery/id1_spaghetti.jpg"
This avoids bundler issues and keeps image paths simple.

## 🧪 Test Cases

The following test cases verify that the Recipe Gallery renders correctly and handles missing or unexpected data gracefully. Each test includes the input, expected behavior, and the observed result.

---

### ✔ Normal Test Cases

#### **Test Case 1 — Rendering All Recipes**

- **Input:** Load the `RecipeGallery` component with the full `recipes` array (6 items).
- **Expected Result:**
  - All 6 recipes appear on the page.
  - Recipes with IDs 1–3 appear under _Recipe Gallery_.
  - Recipes with IDs 4–6 appear under _Island Style Food_.
- **Actual Result:**  
  ✔ All recipes render correctly in their respective sections.

#### **Test Case 2 — Images Load Correctly**

- **Input:** Each recipe card loads its image from `/gallery/...`.
- **Expected Result:**
  - All images display without broken links.
  - Images scale properly within each card.
- **Actual Result:**  
  ✔ All images load successfully from the `public/gallery` folder.

#### **Test Case 3 — Responsive Layout**

- **Input:** Resize the browser window (desktop → tablet → mobile).
- **Expected Result:**
  - CSS Grid adjusts the number of columns automatically.
  - Cards stack vertically on small screens.
- **Actual Result:**  
  ✔ Layout responds smoothly and remains readable at all sizes.

---

### ✔ Edge Case Test Cases

#### **Edge Case 1 — Empty Recipe List**

- **Input:** Temporarily set `recipes = []`.
- **Expected Result:**
  - No recipe cards render.
  - No errors appear in the console.
- **Actual Result:**  
  ✔ Component renders gracefully with no errors.

#### **Edge Case 2 — Missing Image Path**

- **Input:** Remove the `image` field from one recipe object.
- **Expected Result:**
  - The card still renders.
  - The `<img>` tag shows a broken image icon, but the app does not crash.
- **Actual Result:**  
  ✔ Component continues rendering without crashing.

#### **Edge Case 3 — Missing Ingredients Array**

- **Input:** Remove the `ingredients` field from one recipe.
- **Expected Result:**
  - The gallery still renders.
  - The affected card may show an empty or undefined list, but the UI remains stable.
- **Actual Result:**  
  ✔ Component renders without errors; only the affected card shows missing data.

---

## 🎉 Summary

All normal and edge test cases passed successfully.  
The gallery handles expected inputs and gracefully tolerates missing or incomplete data.
