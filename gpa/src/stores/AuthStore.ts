import { create } from "zustand";
import supabase from "@/Authenticator";
import { persist } from "zustand/middleware";
import { useNavigationStore } from "./NavigationStore";

type AuthStore = {
  signIn: (email: string, password: string) => Promise<boolean>; // Updated return type
  signOut: () => void;
  checkAuth: () => void;
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  email: string;
  isLoading: boolean;
};

const initialState = {
  // the inital state of our 'primitive' values
  isAuthenticated: false as boolean | false,
  token: "",
  refreshToken: "",
  email: "",
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState, // we spread our initial state here

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        const { data, error } = await supabase().auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          set({ isLoading: false });
          return false;
        }

        if (data.user.aud) {
          set({ isAuthenticated: true });
          set({ token: data.session.access_token });
          set({ refreshToken: data.session.refresh_token });
          set({ email: email });
        }
        set({ isLoading: false });
        return true;
      },
      signOut: () => {
        set({ isLoading: true });
        supabase().auth.signOut();
        set(initialState); // we can simply reset our store here rather than writing all the values down again
        useNavigationStore.getState().resetState();
      },
      checkAuth: async () => {
        set({ isLoading: true });
        const { error } = await supabase().auth.getSession();
        if (error) {
          set({ isLoading: false });
          return false;
        } else {
          set({ isLoading: false });
          return true;
        }
      },
    }),
    {
      name: "auth",
    }
  )
);

// export const AuthSlice = (set) => {
//   return {
//     ...initialState,
//     signIn: async (email: string, password: string) => {
//       set({ isLoading: true });
//       const { data, error } = await supabase().auth.signInWithPassword({
//         email: email,
//         password: password,
//       });

//       if (error) {
//         set({ isLoading: false });
//         return false;
//       }

//       if (data.user.aud) {
//         set({ isAuthenticated: true });
//         set({ token: data.session.access_token });
//         set({ refreshToken: data.session.refresh_token });
//         set({ email: email });
//       }
//       set({ isLoading: false });
//       return true;
//     },
//     signOut: () => {
//       set({ isLoading: true });
//       supabase().auth.signOut();
//       set(initialState); // we can simply reset our store here rather than writing all the values down again
//       useNavigationStore.getState().resetState();
//     },
//     checkAuth: async () => {
//       set({ isLoading: true });
//       const { error } = await supabase().auth.getSession();
//       if (error) {
//         set({ isLoading: false });
//         return false;
//       } else {
//         set({ isLoading: false });
//         return true;
//       }
//     },
//   };
// };
