import { create } from "zustand";
import { persist } from "zustand/middleware";

import useAuthStore from "./AuthStore";

type NavigationStore = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  resetState: () => void;
};

const initialState = {
  currentTab: "Home",
};

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentTab: (tab: string) => set({ currentTab: tab }),
      resetState: () => set(initialState),
    }),
    {
      name: "navigation-storage",
    }
  )
);
