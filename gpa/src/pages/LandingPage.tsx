import {
  HeroSection,
  VisionSection,
  FeatureSection,
  FooterSection,
} from "@/sections";

import { useAuthStore } from "@/stores/AuthStore";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <HeroSection />
      <VisionSection />
      <FeatureSection />
      <FooterSection />
    </>
  );
}
