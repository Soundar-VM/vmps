import { create } from "zustand";

const filterToggle = create((set) => ({
  status: true,
  toggleStatus: () => set((state) => ({ status: !state.status })), // Correct way to toggle
}));

export default filterToggle;
