import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './screens/settings/SettingsScreen';
import MainTabsView from './navigation/MainTabs.navigation';
import PaymentNavigation from './navigation/Checkout.navigation';
import { Colors } from './styles/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { profileStorage } from '@/services/profile.storage';
import { useEffect, useRef, useState } from 'react';
import { useProfileStore } from './stores/profile.store';
import { fetchProfileByPhone, postProfile } from './api/profile/verify-profile.api';
import GiftCardsNavigation from './navigation/GiftCard.navigation';
import * as Crypto from 'expo-crypto';
import { ProfileType } from './types';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  },
};

export default function App() {
  const setProfile = useProfileStore(state => state.setProfile)
  
  useEffect(() => {
    initializeApp();
  }, [])

  const initializeApp = async () => {
    await getProfileFromStorage();
  };
  
  const getProfileFromStorage = async() => {
    const profile = await profileStorage.getProfile();
    //clearProfileFromStorage()
    if(profile !== null && profile.profile !== null) {
      setProfile(profile.profile);      
      // Is refresh profile needed???
      // refreshProfile(profile.profile.id)
    } else {
      createProfile()      
    }
  }
  
  const createProfile = async() => {
    const UUID = Crypto.randomUUID();
    const profile: ProfileType = {isRegistered: false, id: UUID};
    const newProfile = await postProfile(profile);
    await profileStorage.saveProfile(newProfile);

    setProfile(profile);
  }

  const refreshProfile = async(phone: string) => {
    const profile = await fetchProfileByPhone(phone);
    setProfile(profile.profile);
  }

  const clearProfileFromStorage = async() => {
    setProfile({isRegistered: false, phone: '', timestamp: 0})
    await profileStorage.logout()
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator id='rootStack'>
          <Stack.Screen name='MainTabsView' component={MainTabsView} options={{headerShown: false}} />
          <Stack.Screen name='GiftCardDetails' component={ GiftCardsNavigation } options={{
            headerBackTitle: 'Back',
            headerTintColor: '#FCAF58',
            headerTitleStyle: {
              color: Colors.primary,
            }
          }} />
          <Stack.Screen name='Settings' component={SettingsScreen} options={{
            headerBackTitle: 'Back',
            headerTintColor: '#FCAF58',
            headerTitleStyle: {
              color: Colors.primary,
            },
            presentation: 'modal',
          }} />
          <Stack.Screen name='Payment' component={PaymentNavigation} 
            options={{
              headerBackTitle: 'Back', 
              headerTintColor: '#FCAF58',
              headerTitleStyle: {
                color: Colors.primary,
              },
              headerShown: false,
          }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
