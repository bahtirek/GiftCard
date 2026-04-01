import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '@/navigation/navigation-types';
import { useNavigation } from '@react-navigation/native';
import PurchaseDetails from '@/components/common/PurchaseDetails';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useCartStore } from '@/stores/cart.store';
import { fetchGiftCardById } from '@/api/gift-cards/search.api';
import { GiftCardType } from '@/types';


type Props = NativeStackScreenProps<CartStackParamList, 'EditCartItem'>;

const EditCartItemScreen = ({route}: Props) => {
  const { cartItem } = route.params;
  const navigation = useNavigation();
  const [showHeader, setShowHeader] = useState(true)
  const addItemToEdit = useCartStore(state => state.addItemToEdit);
  const [giftCard, setGiftCard] = useState<GiftCardType>();

  useEffect(() => {
    setupEditing()
  }, [])

  const setupEditing = async() => {
    if(cartItem?.id) {
      const giftCardData = await fetchGiftCardById(cartItem.giftCard!.id.toString());
      if (giftCardData.data.id) setGiftCard(giftCardData.data)
    } 
  }

  const onEditingCompleted = () => {
    addItemToEdit({})
    navigation.goBack();
  }

  return (
     <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
          contentContainerStyle={{flexGrow: 1}}>
      <PurchaseDetails handleButtonPress={onEditingCompleted} cartItemToEdit={cartItem} buttonLabel='Update' giftCardProp={giftCard}/>
    </KeyboardAvoidingView>
  );
}

export default EditCartItemScreen
