import { View, Alert, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { validateCreditCard, validateLength, validateExpDate } from '../../utils/input-validation';
import CustomInput from '@/components/UI/forms/CustomInput';
import { InputValueType, PaymentType } from '@/types';
import { usePaymentStore } from '@/stores/payment.store';

type CreditCardFormProps = {
  validate: boolean;
  paymentUpdated: (value: boolean) => void;
}

const CreditCardForm = ({validate, paymentUpdated}: CreditCardFormProps) => {
  const [cardholderName, setCardholderName] = useState<InputValueType>({value: '', isValid: false});
  const [creditCard, setCreditCard] = useState<InputValueType>({value: '', isValid: false});
  const [expDate, setExpDate] = useState<InputValueType>({value: '', isValid: false});
  const [cvv, setCvv] = useState<InputValueType>({value: '', isValid: false});
  const [isValidated, setIsValidated] = useState(false);
  const addPayment = usePaymentStore(state => state.addPaymentDetails);
  const isMounted = useRef(false);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if(!isValidated) setIsValidated(validate);
    isFormCompleted();
  }, [validate]);

  const isFormCompleted = () => {
    if (cardholderName.isValid && creditCard.isValid && expDate.isValid && cvv.isValid) {
      const payment: PaymentType = {
        cardholderName: cardholderName.value,
        creditCard: creditCard.value,
        expDate: expDate.value,
        cvv: cvv.value
      };
      addPayment(payment);
      paymentUpdated(true);
    } else {
      console.log('Missing data', "Please provide payment details");
      
      return Alert.alert('Missing data', "Please provide payment details")
      
    }
  }
  
  const handleCardholderNameInput = (cardholderName: InputValueType) => {
    setCardholderName(cardholderName);
  }

  const handleCreditCardInput = (creditCard: InputValueType) => {
    setCreditCard(creditCard)
  }

  const handleExpDateInput = (expDate: InputValueType) => {
    setExpDate(expDate)
  }

  const handleCvvInput = (cvv: InputValueType) => {
    setCvv(cvv)
  }

  const cardholderNameRules = [
    (val: string) => !!val || 'Field is required'
  ];
  
  const creditCardRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => (validateCreditCard(val) && validateLength(val, 19)) || 'Wrong credit card number',
  ];
  
  const expDateRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateExpDate(val) || 'Wrong exparation date',
  ];
  
  const cvvRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateLength(val, 3) || 'CVV must be 3 digits long'
  ];

  return (
    <ScrollView style={[]}>
      <View style={{marginBottom: 24, marginTop: 4}}>
        <CustomInput 
          onInput={(cardholderName: InputValueType) => {handleCardholderNameInput(cardholderName)}} 
          placeholder='Cardholder name'
          mask='maskName'
          rules={cardholderNameRules}
        />
      </View>
      <View style={{marginBottom: 24, marginTop: 4}}>
        <CustomInput 
          onInput={(creditCard: InputValueType) => {handleCreditCardInput(creditCard)}} 
          placeholder='Credit card number'
          mask='maskVisaCard'
          keyboardType='number-pad'
          maxLength={19}
          rules={creditCardRules}
        />
      </View>
      <View style={styles.flexRow}>
          <View style={styles.expDate}>
            <CustomInput 
              onInput={(expDate: InputValueType) => {handleExpDateInput(expDate)}} 
              placeholder='Exp. date'
              mask='maskExpDate' 
              keyboardType='number-pad'
              maxLength={5}
              rules={expDateRules}
            />
          </View>
          <View style={styles.cvv}>
            <CustomInput 
              onInput={(cvv: InputValueType) => {handleCvvInput(cvv)}} 
              placeholder='CVV'
              rules={cvvRules}
              keyboardType='number-pad'
              maxLength={3}
              mask='numeric'
            />
          </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
    height: '100%'
  },
  expDate: {
    width: 150,
    marginBottom: 24,
    marginTop: 4
  },
  cvv: {
    width: 130,
    marginBottom: 24,
    marginTop: 4
  }
});
export default CreditCardForm;