import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '@/navigation/navigation-types';
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PurchaseDetails from '@/components/common/PurchaseDetails';


type Props = NativeStackScreenProps<CartStackParamList, 'EditCartItem'>;

const EditCartItemScreen = ({route}: Props) => {
  const { cartItem } = route.params;
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <PurchaseDetails handleButtonPress={handleButtonPress} cartItemToEdit={cartItem} buttonLabel='Update'/>
    </SafeAreaView>
  );
}

export default EditCartItemScreen
