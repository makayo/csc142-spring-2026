import { Link, useSearchParams } from "react-router";
import { recipes } from "../data/recipes";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filtered =
    activeCategory === "all"
      ? recipes
      : recipes.filter((r) => r.category === activeCategory);

  const recipeFoods = filtered.filter((r) => r.category === "recipe");
  const localFoods  = filtered.filter((r) => r.category === "local");
  const desserts    = filtered.filter((r) => r.category === "dessert");

  const badgeStyle = (category: string) => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    background: category === "recipe" ? "#fef3ec" : category === "local" ? "#fef2f2" : "#fefce8",
    color: category === "recipe" ? "#f97316" : category === "local" ? "#ef4444" : "#ca8a04",
  });

  const renderCards = (items: typeof recipes) =>
    items.map((recipe) => (
      <Link key={recipe.id} to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #f0ede8", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "transform 0.18s, box-shadow 0.18s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}
        >
          <img src={recipe.image} alt={recipe.title}
            style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
            onError={(e) => { e.currentTarget.src = "/gallery/fallback.jpg"; }}
          />
          <div style={{ padding: "12px 14px" }}>
            <span style={badgeStyle(recipe.category)}>
              {recipe.category === "recipe" ? "Main Dish" : recipe.category === "local" ? "Local" : "Dessert"}
            </span>
            <h3 style={{ margin: "8px 0 4px", fontSize: 14, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>
              {recipe.title}
            </h3>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#999", lineHeight: 1.4 }}>
              {recipe.ingredients?.slice(0, 2).join(" · ")}
              {(recipe.ingredients?.length ?? 0) > 2 ? " ..." : ""}
            </p>
            <span style={{ fontSize: 12, color: "#f97316", fontWeight: 600 }}>View Recipe</span>
          </div>
        </div>
      </Link>
    ));

  const filterBtn = (label: string, value: string, color: string) => (
    <button
      onClick={() => setSearchParams(value === "all" ? {} : { category: value })}
      style={{
        padding: "8px 18px", borderRadius: 20, border: "none",
        fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.15s",
        background: activeCategory === value ? color : "#f4f4f4",
        color: activeCategory === value ? "#fff" : "#555",
        boxShadow: activeCategory === value ? `0 4px 12px ${color}44` : "none",
      }}
    >
      {label}
    </button>
  );

  const sectionHeader = (title: string, count: number, color: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 48 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>
        {title}
      </h2>
      <span style={{ background: color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
        {count}
      </span>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 64px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.5px" }}>
            Recipe Gallery
          </h1>
          <p style={{ margin: 0, color: "#999", fontSize: 15 }}>
            {filtered.length} of {recipes.length} recipes
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filterBtn("All", "all", "#1a1a1a")}
          {filterBtn("Main Dishes", "recipe", "#f97316")}
          {filterBtn("Local & Ethnic", "local", "#ef4444")}
          {filterBtn("Desserts", "dessert", "#eab308")}
        </div>
      </div>

      {(activeCategory === "all" || activeCategory === "recipe") && recipeFoods.length > 0 && (
        <>
          {sectionHeader("Main Recipes", recipeFoods.length, "#f97316")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {renderCards(recipeFoods)}
          </div>
        </>
      )}

      {(activeCategory === "all" || activeCategory === "local") && localFoods.length > 0 && (
        <>
          {sectionHeader("Local & Ethnic Foods", localFoods.length, "#ef4444")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {renderCards(localFoods)}
          </div>
        </>
      )}

      {(activeCategory === "all" || activeCategory === "dessert") && desserts.length > 0 && (
        <>
          {sectionHeader("Desserts", desserts.length, "#eab308")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {renderCards(desserts)}
          </div>
        </>
      )}

    </div>
  );
}
