import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, pb, text } from '@/styles/styles'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'

type VerifyPhoneProp = {
  onPhoneVerify: (phone: string) => void,
  onCancel: () => void
}

const VerifyPhoneScreen = ({ onPhoneVerify, onCancel }: VerifyPhoneProp) => {
  const [phone, setPhone] = useState<InputValueType>({ value: '', isValid: false })
  const [isPhoneInputTouched, setIsPhoneInputTouched] = useState<Boolean>(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const phoneRules = [
    (val: string) => validateLength(val, 17) || 'Wrong phone number',
    (val: string) => !!val || 'Phone number required',
  ]

  const handlePhoneInput = (Phone: InputValueType) => {
    setPhone(Phone)
  }

  const onUpdateButtonClicked = () => {
    setIsPhoneInputTouched(true)
    if (!phone.isValid) return
    setShowSpinner(true)
    setTimeout(() => {
      setShowSpinner(false)
      onPhoneVerify(phone.value)
    }, 2000)
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container]}>
        <Text style={styles.modalTitle}>Verify phone</Text>
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
        <View style={[commonStyles.buttonContainer]}>
          <CustomButton label='Verify' handlePress={onUpdateButtonClicked} />
          <CustomButton label='Cancel' handlePress={onCancel} secondary containerStyles={[commonStyles.secondaryButton]} />
        </View>
      </View>
      {
        showSpinner &&
        <View style={[styles.modalBackground]}>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
      }
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
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FF4416',
    marginBottom: 24,
  },
})