import { useState, useEffect } from "react";

// useWindowSize — custom hook that tracks browser window dimensions.
// Any component that imports this hook will automatically re-render
// whenever the user resizes the window.
function useWindowSize() {
  // Initialize state with the current window dimensions so the first
  // render already shows correct values (no flash of 0/undefined).
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler called on every resize event.
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach the listener when the component mounts.
    window.addEventListener("resize", handleResize);

    // Cleanup: remove the listener when the component unmounts to
    // prevent memory leaks and stale event handlers.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array — effect runs once on mount only.

  return windowSize;
}

export default useWindowSize;
