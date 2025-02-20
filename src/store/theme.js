import { create } from "zustand";

const theme = create((set) => ({
  themeStatus: "light",
  toggleTheme: () => set((state) => ({ themeStatus: state.themeStatus === "light" ? "dark" : "light" })),
}));

export default theme;
