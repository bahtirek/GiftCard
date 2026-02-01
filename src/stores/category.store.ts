import { CategoryItemType, LocationType } from "@/types";
import allCategories from "@/data/categories";
import { create } from "zustand";

type CategoryStoreType = {
  categories: CategoryItemType[];
  updateCategories: (id: string, value: boolean) => void;
  resetCategories: () => void;
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

  resetCategories: () => {
    set({
      categories: get().categories.map((category: CategoryItemType) => { return {...category, checked: false}})
    })
  },

  getCategories: (): CategoryItemType[] => {
    return get().categories;
  }

}));