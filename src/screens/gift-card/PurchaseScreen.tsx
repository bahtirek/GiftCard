import { Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import PurchaseDetails from '@/components/common/PurchaseDetails';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GiftCardsStackParamList } from '@/navigation/navigation-types';

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'Purchase'>;

const PurchaseScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const {giftCardProp} = route.params;

  const handleButtonPress = () => {
    Alert.alert('Success', 'Gift card added to cart', [
      {
        text: "OK",
        onPress: () => {navigation.goBack();}
      }
    ]);
  }

  return (
     <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
          contentContainerStyle={{flexGrow: 1}}>
      <PurchaseDetails handleButtonPress={handleButtonPress} giftCardProp={giftCardProp} buttonLabel='Add to cart'/>
    </KeyboardAvoidingView>
  );
}

export default PurchaseScreen
