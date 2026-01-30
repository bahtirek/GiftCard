import { LocationType } from "@/types";
import allLocations from "@/data/locations";
import { create } from "zustand";

type LocationStoreType = {
  location: LocationType;
  locations: LocationType[];
  updateLocation: (id: string) => void;
}

export const useLocationStore = create<LocationStoreType>((set, get) => ({
  location: allLocations[0],
  locations: allLocations,

  updateLocation: (id) => { 
    set({
      location: get().locations.find((location) => location.id === id) || {},
    });
  },

  getLocations: (): LocationType[] => {
    return get().locations;
  }

}));