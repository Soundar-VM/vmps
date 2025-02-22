import { create } from 'zustand';

const cartStore = create((set, get) => ({
  cart: {},
  addToCart: (product) => {
    const cart = get().cart;
    
    set({
      cart: {
        ...cart,
        [product.id]: cart[product.id]
          ? { ...cart[product.id], quantity: cart[product.id].quantity + 1 }
          : { ...product, quantity: 1 },
      },
    });
    console.log(cart);
    
  },

  removeFromCart: (id) => {
    const cart = { ...get().cart };
    delete cart[id];
    set({ cart });
  },

  clearCart: () => set({ cart: {} }), 
}));

export default cartStore;
