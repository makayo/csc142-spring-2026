# Recipe Gallery

A simple React recipe gallery built with Vite. It displays recipes in a clean card‑based layout with images, titles, and ingredient lists. Recipes are grouped into two sections based on their IDs:

- **Recipe Gallery** (IDs 1–3)  
- **Island Style Food** (IDs 4–6)

The project demonstrates basic React component structure, array mapping, JSX rendering, and responsive layout using CSS Grid. Images are served from the `public/` folder.

---

## Technologies Used
- React  
- Vite  
- JavaScript (ES6+)  
- CSS Grid / Flexbox  
- Static assets via `public/`  

---

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

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, typically:

```
http://localhost:5173/
```

---

## Features

### Recipe Cards
Each card displays:
- An image (with fallback)
- A title
- An ingredient list

### Dynamic Rendering
Recipes are rendered using:

```js
recipes.map()
```

Each card uses a unique key:

```jsx
key={recipe.id}
```

### Responsive Layout
CSS Grid adjusts automatically based on screen size.

### Organized Sections
Recipes are grouped by ID:
- **1–3:** Recipe Gallery  
- **4–6:** Island Style Food  

---

## Image Handling
Images are stored in:

```
public/gallery/
```

Referenced directly in JSX:

```jsx
image: "/gallery/id1_spaghetti.jpg"
```

A fallback image is used if the file is missing.

---

# Test Cases

## Normal Test Cases

### 1. Rendering All Recipes
**Expected:**  
- All 6 recipes render  
- IDs 1–3 appear in Recipe Gallery  
- IDs 4–6 appear in Island Style Food  

### 2. Images Load Correctly
**Expected:**  
- All images load  
- Fallback image appears if a file is missing  

### 3. Responsive Layout
**Expected:**  
- Grid adjusts on smaller screens  
- Cards stack vertically on mobile  

---

## Edge Case Test Cases

### 1. Empty Recipe List
**Expected:**  
- No cards render  
- No errors  

### 2. Missing Image Field
**Expected:**  
- Card still renders  
- Fallback image displays  
- No crash  

### 3. Missing Ingredients Array
**Expected:**  
- Card renders without ingredients  
- No errors due to optional chaining  

---

## Summary
The Recipe Gallery renders correctly, remains stable under missing or incomplete data, and adapts responsively across screen sizes. All normal and edge test cases pass successfully.
