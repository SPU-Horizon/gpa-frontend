import "./App.css";
import { PrivateRoute } from "./components/custom/ProtectedRoute";
import { LandingPage, LoginPage, RegisterPage, Dashboard } from "./pages";
import "@mantine/core/styles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/sign-in" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="*" element={<p>404</p>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
