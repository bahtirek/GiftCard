import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/settings/SettingsScreen';
import { BottomTabs } from 'react-native-screens';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/cart/CartScreen';
import AllCardsScreen from './screens/gift-card/AllGiftCardsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import GiftCardDetailsScreen from './screens/gift-card/GiftCardDetailsScreen';
import { Colors } from './styles/constants';
import ExpoIcons from '@expo/vector-icons/Feather';
import PurchaseScreen from './screens/gift-card/PurchaseScreen';


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const MainTabsView = () => {
  return <Tabs.Navigator screenOptions={{
    headerStyle: { backgroundColor: 'white'},
    headerTintColor: Colors.primary,
    tabBarStyle: { backgroundColor: 'white', height: 70, paddingBottom: 5 },
    tabBarInactiveTintColor: '#FCAF58',
    tabBarActiveTintColor: Colors.primary
  }}>
    <Tabs.Screen name='Home' component={HomeScreen} options={{
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarShowLabel: false,
      tabBarIcon: ({color}) => (
        <ExpoIcons name="home" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='GiftCardsScreens' component={GiftCardsScreens} options={{
      headerShown: false,
      title: 'Gift Cards',
      tabBarLabel: 'Gift Cards',
      tabBarShowLabel: false,
      tabBarIcon: ({color}) => (
        <ExpoIcons name="gift" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='Cart' component={CartScreen} options={{
      title: 'Shopping Bag',
      tabBarLabel: 'Bag',
      tabBarShowLabel: false,
      tabBarIcon: ({color}) => (
        <ExpoIcons name="shopping-bag" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='Profile' component={ProfileScreen} options={{
      title: 'Profile',
      tabBarLabel: 'Profile',
      tabBarShowLabel: false,
      tabBarIcon: ({color}) => (
        <ExpoIcons name="user" size={22} color={color} />
      )
    }}/>
  </Tabs.Navigator>
}

const GiftCardsScreens = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: 'white'},
      headerTintColor: '#FCAF58',
      headerTitleStyle: {
        color: Colors.primary,
      }
    }}>
      <Stack.Screen name='AllGiftCards' component={AllCardsScreen} options={{
        title: 'Gift Cards',
      }} />
      <Stack.Screen name='GiftCardDetails' component={ GiftCardDetailsScreen } />
      <Stack.Screen name='Purchase' component={ PurchaseScreen } />
    </Stack.Navigator>
  )
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
