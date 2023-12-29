import supabase from "@/Authenticator";
import { useAuthStore } from "@/stores/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();

  supabase();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
