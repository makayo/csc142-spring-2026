import { useState } from "react";

export default function WeatherWidget() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("Weather API failure: corrupted payload");
  }

  return (
    <div>
      <h2>Seattle Weather</h2>
      <p>🌧 58°F</p>

      <button onClick={() => setCrash(true)}>Simulate Failure</button>
    </div>
  );
}
