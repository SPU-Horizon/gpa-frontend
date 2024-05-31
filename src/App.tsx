import "./App.css";
import "@mantine/core/styles.css";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  Page404,
  PrivacyPolicy,
  ProfilePage,
  DashboardWrapper,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/sign-in" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard/*" element={<DashboardWrapper />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
