import { useParams, Link } from "react-router";
import { recipes } from "../data/recipes";

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find((r) => String(r.id) === id);

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Recipe not found</h1>
        <Link to="/gallery">← Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
      <Link
        to="/gallery"
        style={{
          display: "inline-block",
          marginBottom: 20,
          color: "#1a73e8",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        ← Back to Gallery
      </Link>

      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 12,
          display: "block",
          marginBottom: 24,
        }}
        onError={(e) => {
          e.currentTarget.src = "/gallery/fallback.jpg";
        }}
      />

      <h1 style={{ margin: "0 0 8px 0" }}>{recipe.title}</h1>

      <span
        style={{
          display: "inline-block",
          marginBottom: 20,
          padding: "4px 12px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          background:
            recipe.category === "recipe"
              ? "#e8f0fe"
              : recipe.category === "local"
                ? "#fce8e6"
                : "#fef3cd",
          color:
            recipe.category === "recipe"
              ? "#1a73e8"
              : recipe.category === "local"
                ? "#d93025"
                : "#856404",
        }}
      >
        {recipe.category === "recipe"
          ? "Main Dish"
          : recipe.category === "local"
            ? "Local / Ethnic"
            : "Dessert"}
      </span>

      <h2 style={{ marginBottom: 8 }}>🧂 Ingredients</h2>
      <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
        {recipe.ingredients?.map((ing, i) => (
          <li key={i} style={{ marginBottom: 4, fontSize: 15 }}>
            {ing}
          </li>
        ))}
      </ul>

      <h2 style={{ marginBottom: 8 }}>📋 Instructions</h2>
      <p style={{ lineHeight: 1.8, fontSize: 15, color: "#333" }}>
        {recipe.instructions}
      </p>
    </div>
  );
}
