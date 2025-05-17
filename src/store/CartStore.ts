import { StateCreator, create } from 'zustand';

import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity?: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
};

type MyPersist = [['zustand/persist', CartState]];

const cartStore: StateCreator<CartState, [], MyPersist> = (set, get) => ({
  cart: [],
  addToCart: (item) => {
    const existingItem = get().cart.find((p) => p.id === item.id);
    if (existingItem) {
      set({
        cart: get().cart.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        ),
      });
    } else {
      set({
        cart: [...get().cart, { ...item, quantity: 1 }],
      });
    }
  },
  decreaseQuantity: (id) => {
    const cart = get().cart;
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    if ((item.quantity || 1) > 1) {
      set({
        cart: cart.map((p) =>
          p.id === id ? { ...p, quantity: (p.quantity || 1) - 1 } : p
        ),
      });
    } else {
      set({
        cart: cart.filter((p) => p.id !== id),
      });
    }
  },
  increaseQuantity: (id) => {
    const cart = get().cart;
    set({
      cart: cart.map((p) =>
        p.id === id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      ),
    });
  },
  removeFromCart: (id) =>
    set({
      cart: get().cart.filter((item) => item.id !== id),
    }),
  clearCart: () => set({ cart: [] }),
  getTotal: () =>
    get().cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    ),
});

export const useCartStore = create<CartState>()(
  persist(cartStore, {
    name: 'cart-storage',
  })
);
