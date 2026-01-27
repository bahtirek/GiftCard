import { create } from "zustand";

type SearchStoreType = {
  searchQuery: string;
  addSearchQuery: (item: string) => void;
  resetSearchQuery: () => void;
}

export const useSearchStore = create<SearchStoreType>((set, get) => ({
  searchQuery: '',

  addSearchQuery: (item) => {
    set({ searchQuery: item });
  },

  resetSearchQuery: () => {
    set({ searchQuery: '' });
  }
}));