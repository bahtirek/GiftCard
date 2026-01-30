import { CategoryItemType, LocationType } from "@/types";
import allCategories from "@/data/categories";
import { create } from "zustand";

type CategoryStoreType = {
  categories: CategoryItemType[];
  updateCategories: (id: string, value: boolean) => void;
}

export const useCategoryStore = create<CategoryStoreType>((set, get) => ({
  categories: allCategories,

  updateCategories: (id, value) => {
    set({
      categories: get().categories.map((category) =>
        category.id === id ? { ...category, checked: value } : category
      ),
    });
  },

  getCategories: (): CategoryItemType[] => {
    return get().categories;
  }

}));