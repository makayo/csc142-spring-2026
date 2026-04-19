import "./RecipeGallery.css";

const recipes = [
  {
    id: 1,
    title: "Spaghetti",
    image: "/gallery/id1_spaghetti.jpg",
    ingredients: ["Pasta", "Tomato Sauce", "Garlic"],
  },
  {
    id: 2,
    title: "Curry",
    image: "/gallery/id2_curry.jpg",
    ingredients: ["Chicken", "Curry Paste", "Coconut Milk"],
  },
  {
    id: 3,
    title: "Avocado Toast",
    image: "/gallery/id3_avocado.jfif",
    ingredients: ["Bread", "Avocado", "Salt"],
  },
  {
    id: 4,
    title: "Adobo",
    image: "/gallery/id4_adobo.jpg",
    ingredients: ["Chicken", "Soy Sauce", "Vinegar"],
  },
  {
    id: 5,
    title: "Dinuguan",
    image: "/gallery/id5_dinuguan.jpg",
    ingredients: ["Pork", "Blood", "Garlic"],
  },
  {
    id: 6,
    title: "Kelaguen",
    image: "/gallery/id6_kelaguen.webp",
    ingredients: ["Chicken", "Lemon", "Coconut"],
  },
];

export default function RecipeGallery() {
  const recipeGallery = recipes.filter((r) => r.id >= 1 && r.id <= 3);
  const ethnicGallery = recipes.filter((r) => r.id >= 4 && r.id <= 6);

  return (
    <div className="recipe-container">
      <h2>Recipe Gallery</h2>

      <div className="recipe-grid">
        {recipeGallery.map((recipe) => (
          <div key={recipe.id} className="card">
            <img
              src={recipe.image || "/gallery/fallback.jpg"}
              alt={recipe.title}
              onError={(e) => (e.target.src = "/gallery/fallback.jpg")}
            />
            <h3>{recipe.title}</h3>
            <ul>
              {recipe.ingredients?.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Ethnic Gallery</h2>

      <div className="recipe-grid">
        {ethnicGallery.map((recipe) => (
          <div key={recipe.id} className="card">
            <img
              src={recipe.image || "/gallery/fallback.jpg"}
              alt={recipe.title}
              onError={(e) => (e.target.src = "/gallery/fallback.jpg")}
            />
            <h3>{recipe.title}</h3>
            <ul>
              {recipe.ingredients?.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
