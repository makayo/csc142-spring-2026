# Week 5 Recipe Router App (React Router + Vite)

## About

This project is a React application built using Vite and React Router v7 that implements client-side routing for a multi-page recipe gallery application called FlavorHub.

The application demonstrates how to use React Router to navigate between a home page, a categorized recipe gallery with URL-based filtering, and individual recipe detail pages — all without a full page reload.

---

## Features

- Browse 9 recipes across 3 categories: Main Dishes, Local & Ethnic Foods, and Desserts
- Home page with hero section, image-based category cards, and featured recipe previews
- Category cards link directly to a filtered gallery view via URL query parameters
- Gallery page with filter buttons that update the URL and filter recipes by category
- Individual recipe detail page showing the full image, ingredients list, and instructions
- Fallback image handling when a recipe image fails to load
- Back navigation from detail page to gallery

---

## Key Concepts Demonstrated

- React Router Link and NavLink for declarative navigation
- React Router useParams hook to read dynamic route segments
- React Router useSearchParams hook to read and set URL query parameters
- Nested routing with a shared layout via Outlet
- File-based route configuration using @react-router/dev
- TypeScript-typed recipe data with optional fields

---

## Technologies Used

- React 18
- Vite 6
- React Router v7
- TypeScript
- HTML5
- CSS3 (inline styles via component-scoped style objects)

---

## How to Run the Project

1. Clone the repository

    git clone https://github.com/makayo/csc142-spring-2026.git

2. Navigate to the project folder

    cd week05/recipe-router-app

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
    │   └── recipes.ts            # Recipe data with id, title, category, image, ingredients, instructions
    ├── routes/
    │   ├── index.tsx             # Home page — hero, category cards, featured recipes
    │   ├── gallery.tsx           # Gallery page — filtered recipe grid with filter buttons
    │   └── recipe.$id.tsx        # Recipe detail page — full image, ingredients, instructions
    ├── routes.ts                 # Route config — index, gallery, recipe/:id
    ├── root.tsx                  # Root layout — navbar, outlet, footer
    ├── app.css                   # Global base styles
    └── index.tsx                 # App entry point
    public/
    └── gallery/
        ├── id1_spaghetti.jpg
        ├── id2_curry.jpg
        ├── id3_avocado.jfif
        ├── id4_adobo.jpg
        ├── id5_dinuguan.jpg
        ├── id6_kelaguen.webp
        ├── tiramisu.jpg
        ├── cheesecake.webp
        ├── chocolate-lava-cake.png
        └── fallback.jpg

---

## Routes

| Path                      | Component      | Description                            |
|---------------------------|----------------|----------------------------------------|
| /                         | index.tsx      | Home page — hero, categories, featured |
| /gallery                  | gallery.tsx    | Full recipe gallery — all categories   |
| /gallery?category=recipe  | gallery.tsx    | Filtered — Main Dishes only            |
| /gallery?category=local   | gallery.tsx    | Filtered — Local & Ethnic only         |
| /gallery?category=dessert | gallery.tsx    | Filtered — Desserts only               |
| /recipe/:id               | recipe.$id.tsx | Individual recipe detail page          |

---

## Recipe Data Structure

Each recipe in app/data/recipes.ts follows this shape:

    {
      id: number,
      title: string,
      category: "recipe" | "local" | "dessert",
      image: string,
      instructions: string,
      ingredients: string[]
    }

---

## Test Cases

This application was tested using 3 normal cases and 3 edge cases to validate React Router navigation, URL-based filtering, dynamic routing, and error handling.

---

### Normal Test Cases

Normal Case 1: Home Page Loads Correctly

Steps:
- Open the application at http://localhost:5173/

Expected Result:
- Hero section renders with headline and Explore All Recipes button
- Three category cards display with real food photos and recipe counts
- Three featured recipe cards display with images and ingredient counts

Pass Condition: Home page renders all sections without errors

---

Normal Case 2: Category Card Filters the Gallery

Steps:
- On the Home page click the Local & Ethnic category card

Expected Result:
- Browser navigates to /gallery?category=local
- Gallery shows only the 3 Local & Ethnic recipes: Chicken Adobo, Dinuguan, Kelaguen
- The Local & Ethnic filter button is highlighted as active

Pass Condition: URL updates and gallery filters correctly to the selected category

---

Normal Case 3: Recipe Detail Page Loads Full Information

Steps:
- Navigate to the Gallery page
- Click on any recipe card such as Tiramisu

Expected Result:
- Browser navigates to /recipe/7
- Full recipe image displays at the top
- Ingredients list renders all 7 items
- Instructions paragraph displays the full preparation steps
- Back to Gallery link appears and navigates back correctly

Pass Condition: Detail page renders complete recipe data and back navigation works

---

### Edge Test Cases

Edge Case 1: Invalid Recipe ID in URL

Steps:
- Manually type an invalid URL in the browser: http://localhost:5173/recipe/999

Expected Result:
- Page renders a Recipe not found message
- A Back to Gallery link is displayed so the user can recover

Actual Result:
- Not found state renders cleanly without crashing the app

Pass Condition: Invalid route parameter is handled gracefully without a blank screen or error

---

Edge Case 2: Broken Recipe Image Falls Back Gracefully

Steps:
- Open the Gallery page
- One or more recipe images may fail to load if the file is missing

Expected Result:
- The broken image is replaced by the fallback image at /gallery/fallback.jpg
- The card layout remains intact and the recipe title and badge still display

Actual Result:
- onError handler fires and swaps src to the fallback image with no layout shift

Pass Condition: Missing images are handled without breaking the card UI

---

Edge Case 3: Direct URL Navigation to Filtered Gallery

Steps:
- Paste http://localhost:5173/gallery?category=dessert directly into the browser address bar

Expected Result:
- Gallery page loads with only the Desserts section visible
- The Desserts filter button is highlighted as active
- Other sections (Main Recipes, Local & Ethnic) are hidden

Actual Result:
- useSearchParams reads the category param on load and filters correctly without any interaction needed

Pass Condition: URL-based filtering works on direct navigation and page refresh

---

## API / Data Source

This application uses local static data — no external API is called. All recipe data is stored in app/data/recipes.ts and imported directly into components.

| Data        | Source                          |
|-------------|---------------------------------|
| Recipe list | app/data/recipes.ts (9 recipes) |
| Images      | public/gallery/ (local assets)  |

---

## Summary

This project demonstrates how React Router v7 enables multi-page navigation in a single-page React application. Using Link for navigation, useParams for dynamic recipe detail pages, and useSearchParams for URL-driven category filtering, the app provides a clean and functional recipe browsing experience. The test cases validate both expected navigation flows and edge conditions including invalid IDs, broken images, and direct URL access.

---

## Author

MARK YOSINAO
