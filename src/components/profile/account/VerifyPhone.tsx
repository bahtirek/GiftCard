import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { mt, pb, text } from '@/styles/styles'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'

type VerifyPhoneProp = {
  phoneIsSubmitted: () => void
}

const VerifyPhone = ({phoneIsSubmitted}: VerifyPhoneProp) => {
  const [isPhoneInputTouched, setIsPhoneInputTouched] = useState(false);

  const [phone, setPhone] = useState<InputValueType>({ value: '', isValid: false });

  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
  }
  const isFormCompleted = () => {

    if (!phone.value) {
      console.log('Missing data', "Please provide recepient details")
      return Alert.alert('Missing data', "Please provide recepient details")
    }
  }

  const phoneRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateLength(val, 12) || 'Wrong phone number'
  ]

  const submitPhone = () => {
    isFormCompleted();
    if(!isPhoneInputTouched && phone.value) {
      setIsPhoneInputTouched(true);
    }
    if(phone.isValid) {
      phoneIsSubmitted()
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={[text.md, text.grey, pb.md, mt.md]}>Verify phone number:</Text>
        <CustomInput
          onInput={(phone: InputValueType) => { handlePhoneInput(phone) }}
          placeholder='Phone'
          mask='phone'
          maxLength={12}
          keyboardType='number-pad'
          rules={phoneRules}
          isTouched={isPhoneInputTouched}
        />
        </View>
        <View style={{ marginTop: 'auto', paddingTop: 38, paddingBottom: 8 }}>
          <CustomButton label={'Submit'} handlePress={submitPhone} />
        </View>
    </View>
  )
}

export default VerifyPhone

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