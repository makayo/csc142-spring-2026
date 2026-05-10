import { Link } from "react-router";
import { recipes } from "../data/recipes";

const categories = [
  {
    label: "Main Dishes",
    emoji: "🍝",
    category: "recipe",
    image: "/gallery/id1_spaghetti.jpg",
    desc: "Hearty meals for any occasion",
  },
  {
    label: "Local & Ethnic",
    emoji: "🌏",
    category: "local",
    image: "/gallery/id4_adobo.jpg",
    desc: "Traditional flavors from home",
  },
  {
    label: "Desserts",
    emoji: "🍰", // Desserts
    category: "dessert",
    image: "/gallery/tiramisu.jpg",
    desc: "Sweet treats and indulgences",
  },
];

export default function Home() {
  const featured = recipes.slice(0, 3);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "72px 24px 56px" }}>
        <span
          style={{
            display: "inline-block",
            background: "#fef3ec",
            color: "#f97316",
            fontWeight: 600,
            fontSize: 13,
            padding: "6px 14px",
            borderRadius: 20,
            marginBottom: 20,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          9 Recipes and Counting
        </span>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800,
            color: "#1a1a1a",
            margin: "0 0 20px",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
          }}
        >
          Discover Recipes
          <br />
          <span style={{ color: "#f97316" }}>From Every Corner</span>
          <br />
          of the World
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#777",
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          From hearty mains to local classics and sweet desserts — find your
          next favorite dish.
        </p>
        <Link
          to="/gallery"
          style={{
            display: "inline-block",
            background: "#f97316",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            padding: "14px 32px",
            borderRadius: 10,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
          }}
        >
          Explore All Recipes →
        </Link>
      </section>

      {/* Category Cards with Background Images */}
      <section style={{ marginBottom: 64 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 20,
            letterSpacing: "-0.5px",
          }}
        >
          Browse by Category
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.category}
              to={`/gallery?category=${cat.category}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  position: "relative",
                  height: 220,
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(0,0,0,0.2)";
                  const img = e.currentTarget.querySelector(
                    "img",
                  ) as HTMLImageElement;
                  if (img) img.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.12)";
                  const img = e.currentTarget.querySelector(
                    "img",
                  ) as HTMLImageElement;
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/gallery/fallback.jpg";
                  }}
                />

                {/* Dark gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                  }}
                />

                {/* Text content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 22px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 4px",
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {cat.desc}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(4px)",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: 20,
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {recipes.filter((r) => r.category === cat.category).length}{" "}
                    recipes →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section style={{ marginBottom: 64 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1a1a1a",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Featured Recipes
          </h2>
          <Link
            to="/gallery"
            style={{
              color: "#f97316",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            View all →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {featured.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid #f0ede8",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/gallery/fallback.jpg";
                  }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <h3
                    style={{
                      margin: "0 0 6px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1a1a1a",
                    }}
                  >
                    {recipe.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 12, color: "#999" }}>
                    {recipe.ingredients?.length} ingredients
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
