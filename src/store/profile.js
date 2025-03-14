import { create } from "zustand";

const profile = create((set) => ({
  profileStatuss: false, 
  toggleProfile: (status) => set({ profileStatuss: status }),
}));

export default profile;
