import { Switch } from "@/components/ui/switch";
import {
  HeroSection,
  VisionSection,
  FeatureSection,
  FooterSection,
} from "@/sections";
import { useThemeStore } from "@/stores";

import useAuthStore from "@/stores/AuthStore";

import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    <Navigate to="/dashboard" />;
  }

  return (
    <>
      <HeroSection />
      <VisionSection />
      <FeatureSection />
      <FooterSection />
    </>
  );
}
