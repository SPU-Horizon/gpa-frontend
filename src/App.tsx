import "./App.css";
import "@mantine/core/styles.css";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  Dashboard,
  Page404,
  ProfilePage,
  SettingsPage,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";

import { useThemeStore } from "./stores";

function App() {
  const { theme } = useThemeStore();

  const themeClass = theme === "dark" ? "dark" : "light";
  console.log(themeClass);

  return (
    <div className={`${themeClass}`}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/sign-in" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
