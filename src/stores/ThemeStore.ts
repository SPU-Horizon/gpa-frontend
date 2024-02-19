import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme | undefined) => void;
};

const useThemeStoreTemplate: StateCreator<
  ThemeStore,
  [],
  [["zustand/persist", ThemeStore]]
> = persist(
  (set) => ({
    theme: "light",

    setTheme: (theme: Theme | undefined) => {
      set({ theme });
    },
  }),
  {
    name: "theme",
  }
);

const useThemeStore = create(useThemeStoreTemplate);

export default useThemeStore;
