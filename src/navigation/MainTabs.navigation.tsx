import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/home/HomeScreen';
import { Colors } from '@/styles/constants';
import ExpoIcons from '@expo/vector-icons/Feather';
import GiftCardsNavigation from './GiftCard.navigation';
import { View, Text, StyleSheet } from 'react-native';
import { useCartStore } from '@/stores/cart.store';
import { text } from '@/styles/styles';
import CartNavigation from './Cart.navigation';
import HomeHeader from '@/components/home/HomeHeader';
import ProfileNavigation from './Profile.navigation';


const Tabs = createBottomTabNavigator();

const ShoppingBagIcon = ({ color }: { color: string }) => {
  const totalItemsInCart = useCartStore(state => state.totalItemsInCart)
  return (
    <View style={styles.container}>
      <ExpoIcons name="shopping-bag" size={22} color={color} />
      {
        totalItemsInCart > 0 &&
        <View  style={styles.cartTotal}>
          <Text style={[text.primary, text.sm]}>{totalItemsInCart}</Text>
        </View>
      }
    </View>
  )
}

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
      ),
      header: () => (<HomeHeader />)
    }}/>
    <Tabs.Screen name='GiftCardsNavigation' component={GiftCardsNavigation} options={{
      headerShown: false,
      title: 'Gift Cards',
      tabBarLabel: 'Gift Cards',
      tabBarShowLabel: false,
      lazy: false,
      tabBarIcon: ({color}) => (
        <ExpoIcons name="gift" size={22} color={color} />
      )
    }}/>
    <Tabs.Screen name='CartNavigation' component={CartNavigation} options={{
      title: 'Shopping Bag',
      tabBarLabel: 'Bag',
      tabBarShowLabel: false,
      tabBarIcon: ({color}) => (
        <ShoppingBagIcon color={color} />
      )
    }}/>
    <Tabs.Screen name='ProfileNavigation' component={ProfileNavigation} options={{
      headerShown: false,
      tabBarLabel: 'Profile',
      tabBarShowLabel: false,
      tabBarIcon: ({color}) => (
        <ExpoIcons name="user" size={22} color={color} />
      )
    }}/>
  </Tabs.Navigator>
}

export default MainTabsView;

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  cartTotal: {
    position: 'absolute',
    right: -14,
    top: -10,
    padding: 5,
  }
})