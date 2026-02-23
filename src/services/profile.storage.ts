import { ProfileType } from '@/types';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const PROFILE = 'profile_info';
const PROFILE_TEMP = 'profile_info_temp';

export const profileStorage = {
/*   async saveProfile({ phone, firstName, lastName, token }: ProfileType) {
    try {
      await SecureStore.setItemAsync(
        PROFILE,
        JSON.stringify({ phone, name })
      );

      await SecureStore.setItemAsync(TOKEN_KEY, token!);
    } catch (error) {
      console.log('Secure save error:', error);
    }
  },

  async getProfile() {
    try {
      const profile = await SecureStore.getItemAsync(PROFILE);
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      return {
        profile: profile ? JSON.parse(profile) : null,
        token,
      };
    } catch (error) {
      console.log('Secure read error:', error);
      return null;
    }
  }, */


  async saveProfile(profileData: ProfileType) {
    
    try {
      await SecureStore.setItemAsync(
        PROFILE,
        JSON.stringify(profileData)
      );
    } catch (error) {
      console.log('Secure save error:', error);
    }
  },

  async getProfile() {
    try {
      const profile = await SecureStore.getItemAsync(PROFILE);

      return {
        profile: profile ? JSON.parse(profile) : null,
      };
    } catch (error) {
      console.log('Secure read error:', error);
      return null;
    }
  },

  async logout() {
    await SecureStore.deleteItemAsync(PROFILE);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
