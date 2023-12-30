import "./App.css";
import "@mantine/core/styles.css";
import { LandingPage, LoginPage, RegisterPage, Dashboard } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { NavigationBar } from "./sections";

import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/sign-in" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <>
                <NavigationBar />
                <Dashboard />
              </>
            }
          ></Route>
        </Route>
        <Route path="*" element={<p>404</p>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
