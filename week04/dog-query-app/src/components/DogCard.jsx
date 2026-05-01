export default function DogCard({ image }) {
  return (
    <div style={{ marginTop: 20 }}>
      <img
        src={image}
        alt="dog"
        style={{
          width: 320,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
