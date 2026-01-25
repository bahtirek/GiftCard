import { Colors } from '@/styles/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentScreen from '@/screens/checkout/PaymentScreen';
import ReviewScreen from '@/screens/checkout/ReviewScreen';
import BackButton from '@/components/UI/buttons/BackButton';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const PaymentNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: 'white'},
      headerTintColor: '#FCAF58',
      headerTitleStyle: {
        color: Colors.primary,
      }
    }}>
      <Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{
        title: 'Payment',
          headerLeft: Platform.OS === 'ios' ?() => (
            <BackButton />
          ) : undefined,
      }} />
      <Stack.Screen name='ReviewScreen' component={ ReviewScreen } options={{
        title: 'Review Order',
        headerBackTitle: 'Back',
      }} />
    </Stack.Navigator>
  )
}

export default PaymentNavigation;