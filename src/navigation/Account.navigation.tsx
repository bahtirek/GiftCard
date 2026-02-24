import { Colors } from '@/styles/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '@/screens/account/profile/Profile.screen';
import OrdersScreen from '@/screens/account/orders/Orders.screen';
import RedeemScreen from '@/screens/account/redeem/Redeem.screen';
import DashboardScreen from '@/screens/account/dashboard/Dashboard.screen';
import AccountScreen from '@/screens/account/Account.screen';

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
      <Stack.Screen name='AccountScreen' component={AccountScreen} options={{
        title: 'My Account',
      }} />
      <Stack.Screen name='ProfileScreen' component={ ProfileScreen } options={{
        title: 'Profile',
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