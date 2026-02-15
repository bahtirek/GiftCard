import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType } from '@/types'
import { mt, pb, text } from '@/styles/styles'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'

const VerifyPin = () => {
  const [isPinInputTouched, setIsPinInputTouched] = useState(false);

  const [pin, setPin] = useState<InputValueType>({ value: '', isValid: false });

  const handlePinInput = (pin: InputValueType) => {
    setPin(pin)
  }
  const isFormCompleted = () => {

    if (!pin.value) {
      console.log('Missing data', "Please provide recepient details")
      return Alert.alert('Missing data', "Please provide recepient details")
    }
  }

  const pinRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateLength(val, 6) || 'Pin must be 6 digits long'
  ]

  const submitPin = () => {
    isFormCompleted();
    if(!isPinInputTouched && pin.value) {
      setIsPinInputTouched(true);
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={[text.md, text.grey, pb.md, mt.md]}>Verify pin number:</Text>
        <CustomInput
          onInput={(pin: InputValueType) => { handlePinInput(pin) }}
          placeholder='Pin'
          mask='pin'
          maxLength={12}
          keyboardType='number-pad'
          rules={pinRules}
          isTouched={isPinInputTouched}
        />
        </View>
        <View style={{ marginTop: 'auto', paddingTop: 38, paddingBottom: 8 }}>
          <CustomButton label={'Verify'} handlePress={submitPin} />
        </View>
    </View>
  )
}

export default VerifyPin

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