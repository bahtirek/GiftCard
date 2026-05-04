import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, pb, text } from '@/styles/styles'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'

type VerifyPinProp = {
  onPinVerify: (pin: string) => void,
  onCancel: () => void,
  showPinOnly?: boolean
}

const VerifyPinScreen = ({ onPinVerify, onCancel, showPinOnly }: VerifyPinProp) => {
  const [pin, setPin] = useState<InputValueType>({ value: '', isValid: false })
  const [isPinInputTouched, setIsPinInputTouched] = useState<Boolean>(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const pinRules = [
    (val: string) => validateLength(val, 6) || 'Pin must to be 6 charachters long',
    (val: string) => !!val || 'Pin number required',
  ]

  const handlePinInput = (Pin: InputValueType) => {
    setPin(Pin)
  }

  const onUpdateButtonClicked = () => {
    setIsPinInputTouched(true)
    if (!pin.isValid) return;
    setShowSpinner(true)
    setTimeout(() => {
      setShowSpinner(false)
      onPinVerify(pin.value)
    }, 2000)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container]}>
        <Text style={styles.modalTitle}>Verify pin</Text>
        {showPinOnly && <Text style={[text.sm, text.grey, pb.md]}>Enter the 6 digit pin sent to your phone number</Text>}
        <View></View>
        <View style={[commonStyles.inputContainer]}>
          <Text style={[text.md, text.grey, pb.sm]}>Pin:</Text>
          <CustomInput
            onInput={(pin: InputValueType) => { handlePinInput(pin) }}
            placeholder='******'
            keyboardType='number-pad'
            maxLength={6}
            rules={pinRules}
            isTouched={isPinInputTouched}
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

export default VerifyPinScreen

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