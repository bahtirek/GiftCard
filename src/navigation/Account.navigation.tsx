import { Colors } from '@/styles/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '@/screens/account/profile/Profile.screen';
import OrdersScreen from '@/screens/account/orders/Orders.screen';
import RedeemScreen from '@/screens/account/redeem/Redeem.screen';
import DashboardScreen from '@/screens/account/dashboard/Dashboard.screen';
import AccountScreen from '@/screens/account/Account.screen';
import OrderDetailsScreen from '@/screens/account/orders/OrderDetails.screen';
import { AccountStackParamList } from './navigation-types';
import DashboardListScreen from '@/screens/account/dashboard/DashboardList.screen';
import DashboardPurchasedScreen from '@/screens/account/dashboard/DashboardPurchased.screen';
import DashboardRedeemedScreen from '@/screens/account/dashboard/DashboardRedeemed.screen';
import DashboardAccountDetailsScreen from '@/screens/account/dashboard/DashboardAccountDetails.screen';
import DashboardAccountsListScreen from '@/screens/account/dashboard/DashboardAccountsListScreen';
import DashboardRedeemersScreen from '@/screens/account/dashboard/DashboardRedeemers.screen';
import DashboardRedeemerFormScreen from '@/screens/account/dashboard/DashboardRedeemerForm.screen';
import { useProfileStore } from '@/stores/profile.store';

const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountNavigation = () => {
  const { profile } = useProfileStore()
  const role = profile.role;
  
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
        title: 'My Orders',
        headerBackTitle: 'Back',
      }} />
      <Stack.Screen name='OrderDetailsScreen' component={ OrderDetailsScreen } options={{
        title: 'Order Details',
        headerBackTitle: 'Back',
      }} />
      {role === 'support' || role === 'admin' && (
        <Stack.Screen name='RedeemScreen' component={ RedeemScreen } options={{
          title: 'Redeem',
          headerBackTitle: 'Back',
        }} />
      )}
      {role === 'admin' && (
        <>
          <Stack.Screen name='DashboardScreen' component={DashboardScreen} options={{
            title: 'Accounts',
            headerBackTitle: 'Back',
          }} />
          <Stack.Screen name='DashboardAccountsListScreen' component={DashboardAccountsListScreen} options={{
            title: 'Accounts',
            headerBackTitle: 'Back',
            presentation: 'modal',
          }} />
          <Stack.Screen name='DashboardListScreen' component={ DashboardListScreen } options={{
            title: 'Dashboard',
            headerBackTitle: 'Back',
          }} />
          <Stack.Screen name='DashboardPurchasedScreen' component={ DashboardPurchasedScreen } options={{
            title: 'Purchased',
            headerBackTitle: 'Back',
          }} />
          <Stack.Screen name='DashboardRedeemedScreen' component={ DashboardRedeemedScreen } options={{
            title: 'Redeemed',
            headerBackTitle: 'Back',
          }} />
          <Stack.Screen name='DashboardAccountDetailsScreen' component={ DashboardAccountDetailsScreen } options={{
            title: 'Account Details',
            headerBackTitle: 'Back',
          }} />
          <Stack.Screen name='DashboardRedeemersScreen' component={ DashboardRedeemersScreen } options={{
            title: 'Redeemers',
            headerBackTitle: 'Back',
          }} />
          <Stack.Screen name='DashboardRedeemerFormScreen' component={ DashboardRedeemerFormScreen } options={{
            title: 'Redeemer',
            headerBackTitle: 'Back',
            presentation: 'modal'
          }} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AccountNavigation;