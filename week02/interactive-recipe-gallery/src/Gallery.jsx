import { useState } from "react";

const images = [
  {
    id: 101,
    url: "/gallery/chocolate-lava-cake.png",
    description: "Chocolate Lava Cake",
  },
  {
    id: 102,
    url: "/gallery/cheesecake.webp",
    description: "Strawberry Cheesecake",
  },
  {
    id: 103,
    url: "/gallery/vanilla-ice-cream-delight-caramel-drizzle.jpg",
    description: "Vanilla Ice Cream/ Caramel",
  },
  {
    id: 104,
    url: "/gallery/tiramisu.jpg",
    description: "Classic Tiramisu",
  },
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const current = images[index];

  const next = () => index < images.length - 1 && setIndex(index + 1);
  const prev = () => index > 0 && setIndex(index - 1);

  return (
    <div className="page-section">
      <h2>Dessert Gallery</h2>

      <div className="dessert-grid">
        <div className="dessert-card">
          {/* ⭐ Fallback image using EXACT path: gallery/fallback.jpg */}
          <img
            src={current.url}
            alt={current.description}
            onError={(e) => (e.target.src = "gallery/fallback.jpg")}
          />

          <h3>{current.description}</h3>

          <div className="controls">
            <button onClick={prev} disabled={index === 0}>
              Previous
            </button>

            <span>
              {index + 1} / {images.length}
            </span>

            <button onClick={next} disabled={index === images.length - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
