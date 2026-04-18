import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, flex, pb, text } from '@/styles/styles'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'

type VerifyPhoneProp = {
  onPhoneVerify: (phone: string) => void
}

const VerifyPhoneScreen = ({onPhoneVerify}: VerifyPhoneProp) => {
  const [phone, setPhone] = useState<InputValueType>({ value: '', isValid: false })
  const [isPhoneInputTouched, setIsPhoneInputTouched] = useState<Boolean>(false)

  const phoneRules = [
    (val: string) => validateLength(val, 17) || 'Wrong phone number',
    (val: string) => !!val || 'Phone number required',
  ]

  const handlePhoneInput = (Phone: InputValueType) => {
    setPhone(Phone)
  }
  
  const onUpdateButtonClicked = () => {
    setIsPhoneInputTouched(true)
    if(phone.value && !phone.isValid) return
    onPhoneVerify(phone.value)
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={[styles.container]}>
        <View style={[commonStyles.inputContainer]}>
          <Text style={[text.md, text.grey, pb.sm]}>Phone:</Text>
          <CustomInput
            onInput={(phone: InputValueType) => { handlePhoneInput(phone) }}
            placeholder='998 90 1234567'
            keyboardType='number-pad'
            mask='phone'
            maxLength={17}
            rules={phoneRules}
            isTouched={isPhoneInputTouched}
          />
        </View>
        <View style={{marginTop: 'auto', paddingTop: 38}}>
          <CustomButton label='Verify' handlePress={onUpdateButtonClicked} />
        </View>
      </View>
    </ScrollView>
  )
}

export default VerifyPhoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingBottom: 48
  },
})