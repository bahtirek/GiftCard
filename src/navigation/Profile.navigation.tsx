import { Colors } from '@/styles/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '@/screens/profile/Profile.screen';
import AccountScreen from '@/screens/profile/account/Account.screen';
import OrdersScreen from '@/screens/profile/orders/Orders.screen';
import RedeemScreen from '@/screens/profile/redeem/Redeem.screen';
import DashboardScreen from '@/screens/profile/dashboard/Dashboard.screen';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: 'white'},
      headerTintColor: '#FCAF58',
      headerTitleStyle: {
        color: Colors.primary,
      }
    }}>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{
        title: 'Profile',
      }} />
      <Stack.Screen name='AccountScreen' component={ AccountScreen } options={{
        headerBackTitle: 'Back',
      }} />
      <Stack.Screen name='OrdersScreen' component={ OrdersScreen } options={{
        headerBackTitle: 'Back',
      }} />
      <Stack.Screen name='RedeemScreen' component={ RedeemScreen } options={{
        headerBackTitle: 'Back',
      }} />
      <Stack.Screen name='DashboardScreen' component={ DashboardScreen } options={{
        headerBackTitle: 'Back',
      }} />
    </Stack.Navigator>
  )
}

export default ProfileNavigation;