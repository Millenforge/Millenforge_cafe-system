import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customizations: {
    sugarLevel?: string;
    milkType?: string;
    temperature?: string;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: any, customizations: any) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item, customizations) => {
    set((state) => {
      // For simplicity, we'll treat items with different customizations as unique items
      const uniqueId = `${item.id}-${Object.values(customizations).join('-')}`;
      const existingItem = state.items.find((i) => i.id === uniqueId);

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            ...item,
            id: uniqueId,
            price: item.discountPrice || item.price,
            quantity: 1,
            customizations,
          },
        ],
      };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },
  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
