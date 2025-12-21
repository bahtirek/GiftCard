import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/SettingsScreen';
import { BottomTabs } from 'react-native-screens';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import AllCardsScreen from './screens/AllGiftCardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import GiftCardDetailsScreen from './screens/GiftCardDetailsScreen';
import { Colors } from './styles/constants';
import ExpoIcons from '@expo/vector-icons/Feather';


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const GiftCardsOverview = () => {
  return <Tabs.Navigator screenOptions={{
    headerStyle: { backgroundColor: 'white'},
    headerTintColor: Colors.primary,
    tabBarStyle: { backgroundColor: 'white'},
    tabBarInactiveTintColor: '#FCAF58',
    tabBarActiveTintColor: Colors.primary
  }}>
    <Tabs.Screen name='Home' component={HomeScreen} options={{
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarIcon: ({color}) => (
        <ExpoIcons name="home" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='AllGiftCards' component={AllCardsScreen} options={{
      title: 'Gift Cards',
      tabBarLabel: 'Gift Cards',
      tabBarIcon: ({color}) => (
        <ExpoIcons name="gift" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='Cart' component={CartScreen} options={{
      title: 'Shopping Bag',
      tabBarLabel: 'Bag',
      tabBarIcon: ({color}) => (
        <ExpoIcons name="shopping-bag" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='Profile' component={ProfileScreen} options={{
      title: 'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: ({color}) => (
        <ExpoIcons name="user" size={22} color={color} />
      )
    }}/>
  </Tabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='GiftCardsOverview' component={GiftCardsOverview} options={{headerShown: false}} />
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
