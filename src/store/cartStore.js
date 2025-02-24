import { create } from "zustand";


const getLocalCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
const cartStore = create((set, get) => ({
  cart: getLocalCart(),

  addToCart: (id, quantity = 1) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        cart[index] = { ...cart[index], quantity }; 
      } else {
        cart.push({ id, quantity });
      }

      return { cart };
    });
    console.log(get().cart);
    localStorage.setItem("cart", JSON.stringify(get().cart));
    
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },

  clearCart: () => {set({ cart: [] });localStorage.setItem("cart", JSON.stringify(get().cart))},
  getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () => get().cart.reduce((totalPrice, item) => totalPrice + (item.price)*item.quantity, 0),
}));

export default cartStore;
