import { StateCreator, create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark";

type ThemeStore = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark" | undefined) => void;
};

const initialState = {
  theme: "light" as Theme,
};

export const useThemeStore = create<ThemeStore>((set) => ({
  ...initialState,
  setTheme: (theme: "light" | "dark" | undefined) => set({ theme }),
}));

export default useThemeStore;
