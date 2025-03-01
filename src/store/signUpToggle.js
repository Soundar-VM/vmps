import { create } from "zustand";

const signUpToggle = create((set) => ({
  signUpStatus: true, 
  signUpStatusToggle: () => set((state) => ({ signUpStatus: !state.signUpStatus })),
}));

export default signUpToggle;
