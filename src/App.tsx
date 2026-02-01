import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './screens/settings/SettingsScreen';
import GiftCardDetailsScreen from './screens/gift-card/GiftCardDetailsScreen';
import MainTabsView from './navigation/MainTabs.navigation';
import PaymentNavigation from './navigation/Checkout.navigation';
import { Colors } from './styles/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='MainTabsView' component={MainTabsView} options={{headerShown: false}} />
          <Stack.Screen name='GiftCardDetails' component={ GiftCardDetailsScreen } options={{
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
