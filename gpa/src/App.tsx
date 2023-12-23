import "./App.css";
import { LandingPage, LoginPage, RegisterPage } from "./pages";
import "@mantine/core/styles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dashboard" element={<p></p>}></Route>
        <Route path="*" element={<p>404</p>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
