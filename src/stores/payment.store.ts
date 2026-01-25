import { PaymentType } from "@/types";
import { create } from "zustand";

type PaymentStoreType = {
  payment: PaymentType | null;
  addPaymentDetails: (item: PaymentType) => void;
  removePaymentDetails: () => void;
}

export const usePaymentStore = create<PaymentStoreType>((set, get) => ({
  payment: null as PaymentType | null,

  addPaymentDetails: (item) => {
    set({ payment: item });
  },

  removePaymentDetails: () => {
    set({ payment: null });
  }
}));