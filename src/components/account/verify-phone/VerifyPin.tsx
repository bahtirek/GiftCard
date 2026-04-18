import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, flex, pb, text } from '@/styles/styles'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { useProfileStore } from '@/stores/profile.store'

type VerifyPinProp = {
  onPinVerify: (pin: string) => void,
  onCancel: () => void
}

const VerifyPinScreen = ({onPinVerify, onCancel}: VerifyPinProp) => {
  const [pin, setPin] = useState<InputValueType>({ value: '', isValid: false })
  const [isPinInputTouched, setIsPinInputTouched] = useState<Boolean>(false)
  const { setToken } = useProfileStore()

  const pinRules = [
    (val: string) => validateLength(val, 6) || 'Pin must to be 6 charachters long',
    (val: string) => !!val || 'Pin number required',
  ]

  const handlePinInput = (Pin: InputValueType) => {
    setPin(Pin)
  }
  
  const onUpdateButtonClicked = () => {
    setIsPinInputTouched(true)
    if(!pin.isValid) return;
    setToken('dfkgjdkjfhg')
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
        <View style={[commonStyles.buttonContainer]}>
          <CustomButton label='Verify' handlePress={onUpdateButtonClicked} />
          <CustomButton label='Cancel' handlePress={onCancel} secondary containerStyles={[commonStyles.secondaryButton]} />
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
/*     padding: 16,
    paddingBottom: 48 */
  },
})