import { create } from "zustand";
import supabase from "@/Authenticator";
import { persist } from "zustand/middleware";

type AuthStore = {
  signIn: (email: string, password: string) => Promise<boolean | undefined>; // Updated return type
  signOut: () => void;
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  email: string;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false as boolean | false,
      token: "",
      refreshToken: "",
      email: "",

      setIsAuthenticated: (val: boolean) => {
        set({ isAuthenticated: val });
      },
      signIn: async (email: string, password: string) => {
        const { data, error } = await supabase().auth.signInWithPassword({
          email: email,
          password: password,
        });

        localStorage.removeItem;

        if (error) {
          return false;
        }
        console.log("here.");

        if (data.user.aud) {
          set({ isAuthenticated: true });
          set({ token: data.session.access_token });
          set({ refreshToken: data.session.refresh_token });
          set({ email: email });
        }
        return true;
      },
      signOut: () => {
        supabase().auth.signOut();
        set({ isAuthenticated: false });
        set({ token: "" });
        set({ refreshToken: "" });
        set({ email: "" });
      },
    }),
    {
      name: "auth",
    }
  )
);
