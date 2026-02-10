import { create } from "zustand";

type SearchStoreType = {
  searchQuery: string;
  setSearchQuery: (item: string) => void;
  resetSearchQuery: () => void;
}

export const useSearchStore = create<SearchStoreType>((set, get) => ({
  searchQuery: '',

  setSearchQuery: (item) => {
    set({ searchQuery: item });
  },

  resetSearchQuery: () => {
    set({ searchQuery: '' });
  }
}));