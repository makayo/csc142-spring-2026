import { useState, useEffect } from "react";

export default function EyesScene() {
  const [showSmile, setShowSmile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSmile(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 57px)",
        background:
          "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Eyes */}
        <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 0 20px 8px rgba(255,255,255,0.4)",
                animation: "blink 4s ease-in-out infinite",
                animationDelay: `${i * 0.1}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "30px",
                  height: "30px",
                  background: "#111",
                  borderRadius: "50%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  animation: "lookAround 3s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Smile with teeth */}
        {showSmile && (
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "70px",
              animation: "fadeIn 0.8s ease-in-out",
            }}
          >
            {/* Lips */}
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "70px",
                borderBottom: "6px solid #cc0000",
                borderLeft: "4px solid #cc0000",
                borderRight: "4px solid #cc0000",
                borderRadius: "0 0 100px 100px",
              }}
            />
            {/* Teeth */}
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "10px",
                right: "10px",
                height: "35px",
                display: "flex",
                gap: "3px",
                overflow: "hidden",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "white",
                    borderRadius: "0 0 4px 4px",
                    boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Eerie text */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "6px",
          animation: "flicker 3s ease-in-out infinite",
        }}
      >
        I CAN SEE YOU
      </div>

      <style>{`
        @keyframes blink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.05); }
        }
        @keyframes lookAround {
          0%   { left: 15px; }
          25%  { left: 35px; }
          50%  { left: 15px; }
          75%  { left: 5px; }
          100% { left: 15px; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
