import { ProfileType } from '@/types';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const PROFILE = 'profile_info';
const PROFILE_TEMP = 'profile_info_temp';
const PHONE_VERIFICATION_TIME = 'phone_verification_time';

export const profileStorage = {
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

  async savePhoneConfirmationTime(phoneConfirmationTime: number) {
    try {
      await SecureStore.setItemAsync(
        PHONE_VERIFICATION_TIME,
        JSON.stringify({ phoneConfirmationTime })
      );
    } catch (error) {
      console.log('Secure save error:', error);
    }
  },

  async getPhoneConfirmationTime() {
    try {
      const data = await SecureStore.getItemAsync(PHONE_VERIFICATION_TIME);
      return data ? JSON.parse(data).phoneConfirmationTime : null;
    } catch (error) {
      console.log('Secure read error:', error);
      return null;
    }
  },
};
