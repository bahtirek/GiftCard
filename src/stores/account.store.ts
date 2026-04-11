import { GiftCardType, RedeemerType } from "@/types";
import { create } from "zustand";

type AccountStoreType = {
  account: GiftCardType | undefined;
  setAccount: (account: GiftCardType) => void;
  updateAccount: (account: GiftCardType) => void;
  getAccount: () => GiftCardType | undefined;
  updateImages: (images: string[]) => void;
  redeemers: RedeemerType[];
  getRedeemers: () => RedeemerType[];
  getRedeemer: (redeemerId: number) => RedeemerType;
  addRedeemer: (redeemer: RedeemerType) => void;
  updateRedeemer: (redeemer: RedeemerType) => void;
  setRedeemers: (redeemers: RedeemerType[]) => void;
}

export const useAccountStore = create<AccountStoreType>((set, get) => ({
  account: undefined,
  redeemers: [],

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
  },
  
  addRedeemer: (redeemer: RedeemerType) => {
    set((state) => ({
      redeemers: {
        ...state.redeemers,
        redeemer,
      } as RedeemerType[],
    }))
  },

  updateRedeemer: (redeemer: RedeemerType) => {
    set({ redeemers: [redeemer] });
  },

  setRedeemers: (redeemers: RedeemerType[]) => {
    set({ redeemers: redeemers });
  },

  getRedeemer: (): RedeemerType => {
    return get().redeemers[0]
  },

  getRedeemers: (): RedeemerType[] => {
    return get().redeemers
  },

}));