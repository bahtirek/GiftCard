import { GiftCardType, ProfileType } from "@/types";
import { create } from "zustand";

type ProfileStoreType = {
  profile: ProfileType;
  account: GiftCardType | undefined;
  tempProfile: ProfileType;
  setProfile: (profile: ProfileType) => void;
  setAccount: (account: GiftCardType) => void;
  setTempProfile: (profile: ProfileType) => void;
  updateProfile: (profile: ProfileType) => void;
  getProfile: () => ProfileType
  getTempProfile: () => ProfileType
  isPhoneVerified: () => string | undefined
  setToken: (token: string) => void
}

export const useProfileStore = create<ProfileStoreType>((set, get) => ({
  profile: {isRegistered: false},
  account: undefined,
  tempProfile: {isRegistered: false},

  setProfile: (profile) => {
    set({ profile: profile });
  },

  setAccount: (account: GiftCardType) => {
    set({account: account})
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
  },

  isPhoneVerified: (): string | undefined => {
    return get().profile.token
  },

  setToken: (token) => {
    set((state) => ({
      profile: {
        ...state.profile,
        token: token,
      } as ProfileType,
    }));
  } 
}));