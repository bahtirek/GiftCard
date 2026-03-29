import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CartItemType, GiftCardType, InputValueType } from '@/types';
import { useCartStore } from '@/stores/cart.store';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useProfileStore } from '@/stores/profile.store';
import AmountDetails from './AmountDetails';
import RecepientDetails from './RecepientDetails';

type PurchaseDetailsProps = {
  handleButtonPress: () => void;
  buttonLabel: string;
  cartItemToEdit?: CartItemType
  giftCardProp?: GiftCardType
}

const PurchaseDetails = ({ handleButtonPress, buttonLabel, cartItemToEdit, giftCardProp }: PurchaseDetailsProps) => {
  const addItemToEdit = useCartStore(state => state.addItemToEdit);
  const addItem = useCartStore(state => state.addItem);
  const [giftCardAmount, setGiftCardAmount] = useState<InputValueType>({value: '', isValid: false});
  const {profile} = useProfileStore();
  const [email, setEmail] = useState<InputValueType>({value: '', isValid: false});
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: false});
  const [note, setNote] = useState<InputValueType>({value: '', isValid: true});
  const [isPhoneInputTouched, setIsPhoneInputTouched] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);
  const [isOtherAmountInputTouched, setIsOtherAmountInputTouched] = useState(false);

  const handleAmountChange = (amount: InputValueType) => {
    setGiftCardAmount(amount);
  }

  const addToCart = () => {
    isFormCompleted();
    if(!isPhoneInputTouched && phone.value) {
      setIsPhoneInputTouched(true);
    }
    if(!isEmailInputTouched && email.value) {
      setIsEmailInputTouched(true);
    }
    if(!isOtherAmountInputTouched && giftCardAmount) {
      setIsOtherAmountInputTouched(true);
    }

    if ( giftCardAmount.isValid && (email.isValid || phone.isValid) ) {
      const id = cartItemToEdit?.id ? cartItemToEdit.id : '';

      addItem({
        id: id, 
        amount: giftCardAmount.value, 
        name: giftCardProp!.name, 
        image: giftCardProp!.images[0] || '', 
        giftCard: giftCardProp!, 
        email: email.value, 
        phone: phone.value, 
        note: note.value,
        profileId: profile.id
      });

      addItemToEdit({});
      handleButtonPress();
    }
  }

  const isFormCompleted = () => {
    if(!giftCardAmount) {
      return Alert.alert('Missing data', "Please select amount")
    }

    if (!email.value && !phone.value) {
      return Alert.alert('Missing data', "Please provide recepient details")
    }   
  }

  const handleRecipientDetailsChange = (recepientDetails: {email?: InputValueType; phone?: InputValueType; note?: InputValueType}) => {
    if(recepientDetails.email) setEmail(recepientDetails.email);
    if(recepientDetails.phone) setPhone(recepientDetails.phone);
    if(recepientDetails.note) setNote(recepientDetails.note);
  }

  return (
    <>
      {giftCardProp?.id  &&
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View>
            <AmountDetails 
              handleAmountChange={handleAmountChange} 
              priceSet={giftCardProp.priceSet!} 
              isOtherAmountInputTouched={isOtherAmountInputTouched} 
              cartItemToEdit={cartItemToEdit}
            />
            <RecepientDetails 
              handleRecipientDetailsChange={handleRecipientDetailsChange} 
              cartItemToEdit={cartItemToEdit} 
              isPhoneInputTouched={isPhoneInputTouched} 
              isEmailInputTouched={isEmailInputTouched} 
            />
            <View style={{marginTop: 'auto', paddingTop: 38, paddingBottom: 8}}>
              <CustomButton label={buttonLabel} handlePress={addToCart}/>
            </View>
          </View>
        </View>
      </ScrollView>
      }
    </>
  )
}

export default PurchaseDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
})