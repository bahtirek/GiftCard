import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, flex, pb, text } from '@/styles/styles'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'

type VerifyPinProp = {
  onPinVerify: (pin: string) => void
}

const VerifyPinScreen = ({onPinVerify}: VerifyPinProp) => {
  const [pin, setPin] = useState<InputValueType>({ value: '', isValid: false })
  const [isPinInputTouched, setIsPinInputTouched] = useState<Boolean>(false)

  const pinRules = [
    (val: string) => !!val || 'Pin number required',
  ]

  const handlePinInput = (Pin: InputValueType) => {
    setPin(Pin)
  }
  
  const onUpdateButtonClicked = () => {
    setIsPinInputTouched(true)
    if(pin.value && !pin.isValid) return
    onPinVerify(pin.value)
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={[styles.container]}>
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
        <View style={{marginTop: 'auto', paddingTop: 38}}>
          <CustomButton label='Verify' handlePress={onUpdateButtonClicked} />
        </View>
      </View>
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
    padding: 16,
    paddingBottom: 48
  },
})