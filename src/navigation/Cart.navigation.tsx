import { Colors } from '@/styles/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '@/screens/cart/CartScreen';
import EditCartItemScreen from '@/screens/cart/EditCartItemScreen';
import { CartStackParamList } from './navigation-types';

const Stack = createNativeStackNavigator<CartStackParamList>();

const CartNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: 'white'},
      headerTintColor: '#FCAF58',
      headerTitleStyle: {
        color: Colors.primary,
      }
    }}>
      <Stack.Screen name='CartScreen' component={CartScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name='EditCartItem' component={ EditCartItemScreen } options={{
        presentation: 'modal',
      }} />
    </Stack.Navigator>
  )
}

export default CartNavigation;