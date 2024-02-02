import "./App.css";
import "@mantine/core/styles.css";
import { LandingPage, LoginPage, RegisterPage, Dashboard } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";

import { useThemeStore } from "./stores";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className={`${theme.toString()}`}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/sign-in" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/profile" element={<>Profile</>} />
            <Route path="/settings" element={<>Settings</>} />
          </Route>
          <Route path="*" element={<p>404</p>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;