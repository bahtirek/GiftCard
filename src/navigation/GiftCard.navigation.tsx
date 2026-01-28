import { Colors } from '@/styles/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllCardsScreen from '@/screens/gift-card/AllGiftCardsScreen';
import GiftCardDetailsScreen from '@/screens/gift-card/GiftCardDetailsScreen';
import PurchaseScreen from '@/screens/gift-card/PurchaseScreen';
import { GiftCardsStackParamList, RootStackParamList } from './navigation-types';

const Stack = createNativeStackNavigator<GiftCardsStackParamList>();

const GiftCardsNavigation = () => {
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
      <Stack.Screen name='GiftCardDetails' component={ GiftCardDetailsScreen } options={{
        headerBackTitle: 'Back',
      }} />
      <Stack.Screen name='Purchase' component={ PurchaseScreen } options={{
        headerBackTitle: 'Back',
      }} />
    </Stack.Navigator>
  )
}

export default GiftCardsNavigation;