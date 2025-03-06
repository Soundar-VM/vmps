import { create } from "zustand";

const theme = create((set) => ({
  themeStatus: "dark",
  toggleTheme: () => set((state) => ({ themeStatus: state.themeStatus === "light" ? "dark" : "light" })),
  setTheme: (theme) => set(() => ({ themeStatus: theme })),
}));

export default theme;
