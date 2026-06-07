export default function SunScene() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 57px)",
        background: "linear-gradient(180deg, #87CEEB 0%, #FFF9C4 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFD700, #FFA500)",
          boxShadow: "0 0 60px 30px rgba(255,200,0,0.4)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              width: "4px",
              height: "30px",
              background: "#FFD700",
              borderRadius: "2px",
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
              transform: `rotate(${deg}deg) translate(-2px, -75px)`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "-100px",
          animation: "floatCloud1 12s linear infinite",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "40px",
            background: "white",
            borderRadius: "40px",
            opacity: 0.9,
          }}
        />
        <div
          style={{
            width: "70px",
            height: "50px",
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "-20px",
            left: "20px",
          }}
        />
        <div
          style={{
            width: "50px",
            height: "40px",
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "-15px",
            left: "55px",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "140px",
          left: "-200px",
          animation: "floatCloud2 18s linear infinite",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "45px",
            background: "white",
            borderRadius: "40px",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            width: "80px",
            height: "60px",
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "-25px",
            left: "30px",
          }}
        />
        <div
          style={{
            width: "60px",
            height: "45px",
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "-18px",
            left: "75px",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "120px",
          background: "linear-gradient(180deg, #86efac, #4ade80)",
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 60px 30px rgba(255,200,0,0.4); }
          50% { box-shadow: 0 0 80px 50px rgba(255,200,0,0.6); }
        }
        @keyframes floatCloud1 {
          from { left: -150px; }
          to { left: 110%; }
        }
        @keyframes floatCloud2 {
          from { left: -200px; }
          to { left: 110%; }
        }
      `}</style>
    </div>
  );
}
