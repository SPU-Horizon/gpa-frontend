import { create, StateCreator } from "zustand";
import supabase from "@/Authenticator";
import { persist } from "zustand/middleware";
import { useNavigationStore } from "./NavigationStore";
import axios from "axios";

type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
};

const initialState = {
  // the inital state of our 'primitive' values
  isAuthenticated: false as boolean | false,
  token: "",
  refreshToken: "",
  email: "",
  isLoading: false,
};

type AuthStore = {
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  checkAuth: () => Promise<boolean>;
  registerUser: ({
    firstName,
    lastName,
    email,
  }: RegisterType) => Promise<boolean>;
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  email: string;
  isLoading: boolean;
};

const useAuthStoreTemplate: StateCreator<
  AuthStore,
  [],
  [["zustand/persist", AuthStore]]
> = persist(
  (set) => ({
    signIn: async (email, password) => {
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
      set(initialState);
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
    registerUser: async ({ firstName, lastName, email }) => {
      set({ isLoading: true });

      // const { data, error } = await supabase().auth.signUp({
      //   email: email,
      //   password: password,
      //   options: {
      //     emailRedirectTo: `http://${window.origin}/sign-in`,
      //   },
      // });

      /*
        if (error) {
          set({ isLoading: false });
          console.log(error);
          return false;
        } else {
          // Add user to the database

        
        } */

      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      };

      const response = await fetch(
        "http://localhost:3000/user/register",
        options
      );

      const res = await response.json();
      console.log(res);

      set({ isAuthenticated: false });
      set({ isLoading: false });
      return true;
    },
    // ... other initial state properties
    isLoading: false,
    isAuthenticated: false,
    token: "",
    refreshToken: "",
    email: "",
  }),
  {
    name: "auth",
  }
);

const useAuthStore = create(useAuthStoreTemplate);

export default useAuthStore;
