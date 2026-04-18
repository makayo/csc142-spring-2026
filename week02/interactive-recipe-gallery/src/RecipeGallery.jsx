// RecipeGallery.jsx
import React from "react";
import "./RecipeGallery.css";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"],
    image: "/gallery/id1_spaghetti.jpg",
  },
  {
    id: 2,
    title: "Chicken Curry",
    ingredients: ["Chicken", "Curry Paste", "Coconut Milk", "Onions"],
    image: "/gallery/id2_curry.jpg",
  },
  {
    id: 3,
    title: "Avocado Toast",
    ingredients: ["Bread", "Avocado", "Salt", "Pepper"],
    image: "/gallery/id3_avocado.jfif",
  },

  {
    id: 4,
    title: "Chicken Adobo",
    ingredients: [
      "Chicken",
      "Soy Sauce",
      "Vinegar(White or Apple cider)",
      "Garlic",
      "Onions",
      "Bay leaf(1)",
      "Black Peppercorn",
    ],
    image: "/gallery/id4_adobo.jpg",
  },

  {
    id: 5,
    title: "Dinuguan",
    ingredients: [
      "Diced pork/intestine",
      "water",
      "Garlic",
      "Salt",
      "Pepper",
      "Bird's eye chiles",
      "Pig's blood",
      "Filipino vinegar",
    ],
    image: "/gallery/id5__dinuguan.jpg",
  },

  {
    id: 6,
    title: "Kelaguen",
    ingredients: [
      "Grilled Chicken diced  or raw sliced beef(ceviche style) or diced par-boiled shrimp",
      " fresh lemon juice",
      "Grated fresh coconut",
      "Guam local boonie peppers",
      "Salt",
      "Pepper",
      "Green onions",
    ],
    image: "/gallery/id6_kelaguen.webp",
  },
];

export default function RecipeGallery() {
  return (
    <div className="gallery-container">
      {/* Main Recipe Gallery */}
      <h1>Recipe Gallery</h1>

      <div className="recipe-grid">
        {recipes
          .filter((recipe) => recipe.id <= 3)
          .map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>

              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>

      {/* Island Style Food Section */}
      <h1 style={{ marginTop: "40px" }}>Island Style Food</h1>

      <div className="recipe-grid">
        {recipes
          .filter((recipe) => recipe.id >= 4)
          .map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>

              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
