import { View, StyleSheet, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import CustomButton from '@components/UI/buttons/CustomButton';
import RadioButton from '@components/UI/forms/RadioButton';
import CreditCardForm from '@/components/shopping-cart/CreditCardForm';
import ClickForm from '@/components/shopping-cart/ClickForm';
import { pb, pt, px } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';


const CheckoutModal = () => {
  const [validate, setValidate] = useState(false)
  const [paymentType, setPaymentType] = useState('visa')
  const navigation = useNavigation();

  const onReview = () => {
    setValidate(!validate)
  }

  const onPaymentUpdated = (value: boolean) => {
    console.log('payment updated',value);
    if(value) navigation.navigate('ReviewScreen' as never);
  }

  const handleSelect = (value: string) => {
    setPaymentType(value)
  }
 
  return (
    <SafeAreaView edges={["left", "right"]} style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.container]}>
          <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 16}}>
            <View style={{marginBottom: 24}}>
              <RadioButton 
                label={'Visa / Uzcard / Humo'}
                value={'visa'}
                status={paymentType === 'visa' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('visa')}
              />
              <RadioButton 
                label={'Click'}
                value={'click'}
                status={paymentType === 'click' ? true : false}
                className="mt-6"
                onSelect={() => handleSelect('click')}
              />
            </View>
            {
              paymentType == 'visa' &&
              <CreditCardForm validate={validate} paymentUpdated={onPaymentUpdated} />
            }
            {
              paymentType == 'click' &&
              <ClickForm />
            }
            <View style={[pb.xl, pt.xl]}>
              <CustomButton label={'Review'} handlePress={onReview} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        
      }
    })
  },

})

export default CheckoutModal;