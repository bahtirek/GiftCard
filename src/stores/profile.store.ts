import { ProfileType } from "@/types";
import { create } from "zustand";

type ProfileStoreType = {
  profile: ProfileType;
  tempProfile: ProfileType;
  setProfile: (profile: ProfileType) => void;
  setTempProfile: (profile: ProfileType) => void;
  updateProfile: (profile: ProfileType) => void;
  getProfile: () => ProfileType
  getTempProfile: () => ProfileType
}

export const useProfileStore = create<ProfileStoreType>((set, get) => ({
  profile: {isRegistered: false},
  tempProfile: {isRegistered: false},

  setProfile: (profile) => {
    set({ profile: profile });
  },

  updateProfile: (profile) => {
    set({ profile: profile });
  },

  getProfile: (): ProfileType => {
    return get().profile
  },

  getTempProfile: (): ProfileType => {
    return get().tempProfile
  },
  
  setTempProfile: (profile) => {
    set({ tempProfile: profile });
  }
}));