import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PurchaseDetails from '@/components/common/PurchaseDetails';

const PurchaseScreen = () => {
  const navigation = useNavigation();

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
      <PurchaseDetails handleButtonPress={handleButtonPress} buttonLabel='Add to cart'/>
    </SafeAreaView>
  );
}

export default PurchaseScreen
