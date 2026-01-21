import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputValueType } from '@/types';
import { useGiftCardsStore } from '@/stores/giftCard.store';
import { useCartStore } from '@/stores/cart.store';
import { validateAmount, validateEmail, validateLength } from '@/utils/input-validation';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioButton from '@/components/UI/forms/RadioButton';
import CustomInput from '@/components/UI/forms/CustomInput';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';

const PurchaseScreen = () => {
  const navigation = useNavigation();
  const giftCard = useGiftCardsStore(state => state.giftCard);
  const setGiftCard = useGiftCardsStore(state => state.setGiftCard);
  const cartItemToEdit = useCartStore(state => state.cartItemToEdit);
  const addItemToEdit = useCartStore(state => state.addItemToEdit);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if(cartItemToEdit?.id) {
      if(cartItemToEdit.otherAmount) {
        setOtherAmount({value: cartItemToEdit.otherAmount});
        setSelectedAmount('other');
      } else {
        setSelectedAmount(cartItemToEdit.amount!);
      }
      if(cartItemToEdit.email) setEmail({value: cartItemToEdit.email});
      if(cartItemToEdit.phone) setPhone({value: cartItemToEdit.phone});
      if(cartItemToEdit.note) setNote({value: cartItemToEdit.note});
    } else {
      resetForm()
    }
  }, [])
  const [selectedAmount, setSelectedAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState<InputValueType>({value: '', isValid: true});
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState<InputValueType>({value: '', isValid: false});
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: false});
  const [note, setNote] = useState<InputValueType>({value: '', isValid: true});
  const [isPhoneInputTouched, setIsPhoneInputTouched] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);
  const [isOtherAmountInputTouched, setIsOtherAmountInputTouched] = useState(false);

  let minAmount = '';
  if (giftCard?.priceSet) {
    minAmount = giftCard.priceSet[0].amount;
  }

  const handleSelect = (amount: string) => {
    setSelectedAmount(amount);
    if(amount != 'other') setOtherAmount({value: ''});
  }

  const handleEmailInput = (email: InputValueType) => {
    setEmail(email)
  }

  const handleNoteInput = (note: InputValueType) => {
    setNote(note)
  }

  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
  }

  const handleAmountInput = (amount: InputValueType) => {
    setOtherAmount(amount)
  }

  const addToCart = () => {
    isFormCompleted();
    if(!isPhoneInputTouched && phone.value) {
      setIsPhoneInputTouched(true);
    }
    if(!isEmailInputTouched && email.value) {
      setIsEmailInputTouched(true);
    }
    if(!isOtherAmountInputTouched && otherAmount.value) {
      setIsOtherAmountInputTouched(true);
    }

    const amount = otherAmount.value ? otherAmount.value : selectedAmount;
    if(
      ((amount && amount != "other") || otherAmount.isValid) &&
      (email.isValid || phone.isValid)
    ) {
      const id = cartItemToEdit?.id ? cartItemToEdit.id : '';

      addItem({id: id, quantity: quantity, amount: amount, giftCard: giftCard!, email: email.value, phone: phone.value, note: note.value, otherAmount: otherAmount.value});
      addItemToEdit({});
      resetForm();
      Alert.alert('Success', 'Gift card added to cart', [
        {
          text: "OK",
          onPress: () => {navigation.goBack();}
        }
      ]);
    }
  }

  const resetForm =() => {
    setSelectedAmount('');
    setOtherAmount({value: ''});
    setEmail({value: ''});
    setPhone({value: ''});
    setNote({value: ''});
  }

  const isFormCompleted = () => {
    if(!selectedAmount) {
      console.log('Missing data', "Please select amount")
      return Alert.alert('Missing data', "Please select amount")
    }

    if (selectedAmount == 'other') {
      if(!otherAmount.value) {
        console.log('Missing data', "Please select amount")
        return Alert.alert('Missing data', "Please select amount")
      }
    }

    if (!email.value && !phone.value && otherAmount.isValid) {
      console.log('Missing data', "Please provide recepient details")
      return Alert.alert('Missing data', "Please provide recepient details")
    }   
  }

  const phoneRules = [
    (val: string) => validateLength(val, 12) || 'Wrong phone number'
  ]

  const emailRules = [
    (val: string) => validateEmail(val) || 'Wrong email format'
  ]

  const amountRules = [
    (val: string) => validateAmount(val, minAmount) || `Amount can't be less than ${minAmount}`
  ]

  return (
    <SafeAreaView edges={["left", "right"]} style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {/* <Stack.Screen options={{title: `${giftCard?.label}`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} /> */}
      {giftCard?.id  &&
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 32, paddingBottom: 40}}>
            <Text style={[]}>Choose amount</Text>
            <View>
              {
                giftCard?.priceSet!.map((price, index) => {
                  return <RadioButton 
                    label={price.amount}
                    value={price.amount}
                    status={selectedAmount === price.amount ? true : false}
                    className="mt-4"
                    onSelect={() => handleSelect(price.amount)}
                    key={price.id}
                  />
                })
              }
              <RadioButton 
                label="other"
                value='other'
                status={selectedAmount === 'other' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('other')}
              />
            </View>
            <View style={{marginTop: 16, marginBottom: 24}}>
              { (selectedAmount === 'other') &&
                <CustomInput 
                  onInput={(amount: InputValueType) => {handleAmountInput(amount)}} 
                  keyboardType="number-pad" 
                  placeholder='Other amount' 
                  mask='currency'
                  presetValue={cartItemToEdit?.otherAmount}
                  rules={amountRules}
                  isTouched={isOtherAmountInputTouched}
                />
              }
            </View>
            <Text style={styles.sectionTitle}>Recepient details:</Text>
            <View style={styles.inputContainer}>
              <CustomInput 
                onInput={(phone: InputValueType) => {handlePhoneInput(phone)}} 
                placeholder='Phone'
                mask='phone' 
                maxLength={12}
                keyboardType='number-pad'
                presetValue={cartItemToEdit?.phone}
                rules={phoneRules}
                className='pl-14'
                isTouched={isPhoneInputTouched}
              />
            </View>
            <Text style={styles.sectionTitle}>Or</Text>
            <View>
              <CustomInput 
                onInput={(email: InputValueType) => {handleEmailInput(email)}} 
                placeholder='Email'
                keyboardType='email-address'
                presetValue={cartItemToEdit?.email}
                rules={emailRules}
                isTouched={isEmailInputTouched}
              />
            </View>
            <Text style={styles.sectionTitle}>Gift note:</Text>
            <View>
              <CustomInput 
                onInput={(note: InputValueType) => {handleNoteInput(note)}} 
                placeholder='Best wishes'
                multiline={true}
                numberOfLines={10}
                presetValue={cartItemToEdit?.note}
                style={{ 
                  height: 100,
                  textAlignVertical: 'top',
                  paddingTop: 9,
                  paddingBottom: 9
                }}
              />
            </View>
            <View style={{marginTop: 32}}>
              <CustomButton label={'Add to cart'} handlePress={addToCart}/>
            </View>
          </View>
        </View>
      </ScrollView>
      }
    </SafeAreaView>
  )
}

export default PurchaseScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 24, // pt-6 in Tailwind is 24px
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