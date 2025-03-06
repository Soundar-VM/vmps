import { create } from "zustand";

const profileToggle = create((set) => ({
  profileStatus: false, 
  toggleProfileStatus: () => set((state) => ({ signUpStatus: !state.signUpStatus })),
}));

export default profileToggle;
