import { ProfileType } from "@/types";
import { create } from "zustand";

type ProfileStoreType = {
  profile: ProfileType;
  setProfile: (profile: ProfileType) => void;
  updateProfile: (profile: ProfileType) => void;
  getProfile: () => ProfileType
}

export const useProfileStore = create<ProfileStoreType>((set, get) => ({
  profile: {isRegistered: false},

  setProfile: (profile) => {
    set({ profile: profile });
  },

  updateProfile: (profile) => {
    set({ profile: profile });
  },

  getProfile: (): ProfileType => {
    return get().profile
  }
}));