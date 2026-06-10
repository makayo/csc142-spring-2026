import ErrorBoundary from "./components/ErrorBoundary";
import WeatherWidget from "./components/WeatherWidget";

function App() {
  return (
    <div>
      <header>
        <h1>🌐 Social Media Dashboard</h1>
        <hr />
      </header>

      <div>
        <h2>News Feed</h2>
        <ul>
          <li>📷 Friend uploaded a photo.</li>
          <li>❤️ You received 3 likes.</li>
          <li>🔥 React is trending.</li>
        </ul>
      </div>

      <ErrorBoundary>
        <WeatherWidget />
      </ErrorBoundary>

      <hr />
      <p>© 2026 Dashboard</p>
    </div>
  );
}

export default App;
