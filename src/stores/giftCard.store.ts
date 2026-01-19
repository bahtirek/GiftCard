import { GiftCardType } from "@/types";
import { create } from "zustand";

export type GiftCardsStoreState = {
  giftCards: GiftCardType[];
  giftCard: GiftCardType | null;
  setGiftCard: (giftCard: GiftCardType) => void;
  addGiftCard: (giftCard: GiftCardType) => void;
  removeGiftCard: (id: string) => void;
};

export const useGiftCardsStore = create<GiftCardsStoreState>((set) => ({
  giftCards: [] as GiftCardType[],
  giftCard: null as GiftCardType | null,

  setGiftCard: (giftCard: GiftCardType) => set(() => ({
    giftCard,
  })),

  addGiftCard: (giftCard: GiftCardType) => set((state) => ({
    giftCards: [...state.giftCards, giftCard]
  })),

  removeGiftCard: (id: string) => set((state) => ({
    giftCards: state.giftCards.filter((giftCard) => giftCard.id !== id),
  })),
}))