import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // 1. Increment
  const increment = () => {
    setCount(count + 1);
  };

  // 2. Increment After Delay
  const incrementAfterDelay = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 2000);
  };

  // 3. Increment Twice (demo batching)
  const incrementTwice = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  // 4. Correct Increment Twice
  const correctIncrementTwice = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Count: {count}</h2>

      <button onClick={increment}>Increment by 1</button>
      <br />
      <br />

      <button onClick={incrementAfterDelay}>Increment by 1 After Delay</button>
      <br />
      <br />

      <button onClick={incrementTwice}>Increments Counter Twice (demo batching)</button>
      <br />
      <br />

      <button onClick={correctIncrementTwice}>Increments by 2</button>
    </div>
  );
}

export default Counter;
