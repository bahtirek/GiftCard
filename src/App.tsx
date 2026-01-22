import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './screens/settings/SettingsScreen';
import GiftCardDetailsScreen from './screens/gift-card/GiftCardDetailsScreen';
import MainTabsView from './navigation/MainTabs.navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='MainTabsView' component={MainTabsView} options={{headerShown: false}} />
          <Stack.Screen name='GiftCardDetails' component={ GiftCardDetailsScreen } />
          <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
