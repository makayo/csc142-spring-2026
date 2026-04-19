import { useState } from "react";
import "./InteractiveGallery.css";

const desserts = [
  {
    image: "/gallery/cheesecake.webp",
    title: "Classic Cheesecake",
  },
  {
    image: "/gallery/chocolate-lava-cake.png",
    title: "Chocolate Lava Cake",
  },
  {
    image: "/gallery/tiramisu.jpg",
    title: "Tiramisu",
  },
  {
    image: "/gallery/vanilla-ice-cream-delight-caramel-drizzle.jpg",
    title: "Vanilla Ice Cream Delight",
  },
];

export default function InteractiveGallery() {
  const [index, setIndex] = useState(0);
  const current = desserts[index];

  const goNext = () => {
    setIndex((prev) => (prev === desserts.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? desserts.length - 1 : prev - 1));
  };

  return (
    <div className="interactive-container">
      <h2>Interactive Dessert Gallery</h2>

      <img src={current.image} alt={current.title} className="dessert-img" />

      <p className="dessert-title">{current.title}</p>
      <p className="position">
        {index + 1} / {desserts.length}
      </p>

      <div className="buttons">
        <button className="btn" onClick={goPrev}>
          Previous
        </button>
        <button className="btn" onClick={goNext}>
          Next
        </button>
      </div>
    </div>
  );
}
