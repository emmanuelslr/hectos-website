import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string, size: string, color: string) => void;
  updateQuantity: (itemId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color
        );

        if (existingItem) {
          const updatedItems = state.items.map((i) =>
            i.id === item.id && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );

          return {
            items: updatedItems,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          };
        }

        return {
          items: [...state.items, { ...item, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + item.price,
        };
      }),

      removeItem: (itemId, size, color) => set((state) => {
        const itemToRemove = state.items.find(
          (i) => i.id === itemId && i.size === size && i.color === color
        );

        if (!itemToRemove) return state;

        return {
          items: state.items.filter(
            (i) => !(i.id === itemId && i.size === size && i.color === color)
          ),
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        };
      }),

      updateQuantity: (itemId, size, color, quantity) => set((state) => {
        const itemToUpdate = state.items.find(
          (i) => i.id === itemId && i.size === size && i.color === color
        );

        if (!itemToUpdate) return state;

        const quantityDiff = quantity - itemToUpdate.quantity;

        const updatedItems = state.items.map((i) =>
          i.id === itemId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        );

        return {
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + (itemToUpdate.price * quantityDiff),
        };
      }),

      clearCart: () => set({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }),
      isDrawerOpen: false,
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
