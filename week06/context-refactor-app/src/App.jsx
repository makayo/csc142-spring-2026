import { UserProvider } from "./UserContext";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Dashboard />
    </UserProvider>
  );
}

export default App;
