import { GiftCardType } from "@/types";
import { create } from "zustand";

type AccountStoreType = {
  account: GiftCardType | undefined;
  setAccount: (account: GiftCardType) => void;
  updateAccount: (account: GiftCardType) => void;
  getAccount: () => GiftCardType | undefined;
  updateImages: (images: string[]) => void;
}

export const useAccountStore = create<AccountStoreType>((set, get) => ({
  account: undefined,

  setAccount: (account: GiftCardType) => {
    set({account: account})
  },

  updateAccount: (account: GiftCardType) => {
    set({ account: account });
  },

  getAccount: (): GiftCardType | undefined => {
    return get().account
  },

  updateImages: (images: string[]) => {
    set((state) => ({
      account: {
        ...state.account,
        images: images,
      } as GiftCardType,
    }));
  }
}));