import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "dark",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
