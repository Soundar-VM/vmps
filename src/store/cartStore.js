import { create } from "zustand";

const cartStore = create((set, get) => ({
  cart: [],

  addToCart: (id, quantity = 1) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        cart[index] = { ...cart[index], quantity }; // Directly update quantity
      } else {
        cart.push({ id, quantity });
      }

      return { cart };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => set({ cart: [] }),
}));

export default cartStore;
