import React, { useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '@/navigation/navigation-types';
import { useNavigation } from '@react-navigation/native';
import PurchaseDetails from '@/components/common/PurchaseDetails';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useCartStore } from '@/stores/cart.store';


type Props = NativeStackScreenProps<CartStackParamList, 'EditCartItem'>;

const EditCartItemScreen = ({route}: Props) => {
  const { cartItem } = route.params;
  const navigation = useNavigation();
  const [showHeader, setShowHeader] = useState(true)
  const addItemToEdit = useCartStore(state => state.addItemToEdit);

  const handleButtonPress = () => {
    addItemToEdit({})
    navigation.goBack();
  }



  return (
     <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
          contentContainerStyle={{flexGrow: 1}}>
      <PurchaseDetails handleButtonPress={handleButtonPress} cartItemToEdit={cartItem} buttonLabel='Update'/>
    </KeyboardAvoidingView>
  );
}

export default EditCartItemScreen
