import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView edges={["left", "right"]} style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <PurchaseDetails handleButtonPress={handleButtonPress} giftCardProp={giftCardProp} buttonLabel='Add to cart'/>
    </SafeAreaView>
  );
}

export default PurchaseScreen
