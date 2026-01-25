import { CartItemType, GiftCardType } from "@/types";
import { randomUUID } from "expo-crypto";
import { create } from "zustand";

type CartStoreType = {
  items: CartItemType[];
  totalItemsInCart: number
  cartItemToEdit: CartItemType | null
  addItem: (cartItem: CartItemType) => void;
  addItemToEdit: (item: CartItemType) => void,
  deleteItemFromCart: (id: string) => void,
  deleteAllItemsFromCart: () => void,
  submitOrder: () => void,
  getOrders: () => any,
}

export const useCartStore = create<CartStoreType>((set, get) => ({
  items: [] as CartItemType[],
  totalItemsInCart: 0,
  cartItemToEdit: null as CartItemType | null,

  addItem: (cartItem: CartItemType) => {
    const { id, quantity, amount, giftCard, email, phone, note, otherAmount } = cartItem;
    const items = get().items;
    let newItems = [...items];
    if(id) {
      newItems = newItems.map(item => {
        if(item.id === id) {
          return {
            ...item,
            quantity,
            amount,
            giftCard,
            email,
            phone,
            note,
            otherAmount
          }
        }
        return item;
      })
    } else {
      newItems.push({
        id: randomUUID(),
        quantity,
        amount,
        giftCard,
        email,
        phone,
        note,
        otherAmount
      });
    }
    set({ items: newItems, totalItemsInCart: newItems.length });
  },

  addItemToEdit: (item) => {
    set({ cartItemToEdit: item });
  },

  deleteItemFromCart: (id) => {
    const items = get().items;
    const newItems = items.filter((item: CartItemType) => item.id !== id);
    set({ items: newItems, totalItemsInCart: newItems.length });
  },

  deleteAllItemsFromCart: () => {
    set({ items: [], totalItemsInCart: 0 });
  },

  submitOrder: () => {
    // Implement order submission logic here
  },

  getOrders: () => {
    // Implement logic to retrieve orders here
    return [];
  },
}));