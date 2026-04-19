import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { flex } from '@/styles/styles'
import VerifyPhone from '@/components/account/verify-phone/VerifyPhone'
import VerifyPin from '@/components/account/verify-phone/VerifyPin'
import SpinnerModal from '@/components/UI/modals/SpinnerModal'
import { useNavigation } from '@react-navigation/native'

const VerifyPhoneScreen = () => {
  const [showSpinner, setShowSpinner] = useState(false)
  const [showVerifyPhone, setShowVerifyPhone] = useState(true)
  const navigation = useNavigation()

  const onPhoneVerify = (phone: string) => {
    setShowSpinner(true)
    setTimeout(()=>{
      setShowSpinner(false);
      setShowVerifyPhone(false)
    }, 500)
  }
  const onPinVerify = (pin: string) => {
    setShowSpinner(true)
    setTimeout(()=>{
      navigation.goBack()
      setShowSpinner(false)
    }, 500)
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
      style={[flex.flex]}
    >
      {
        showVerifyPhone ? (
          <VerifyPhone onPhoneVerify={onPhoneVerify} />
        ) : (
          <VerifyPin onPinVerify={onPinVerify} />
        )
      }
      <SpinnerModal toggleModal={showSpinner} />
    </KeyboardAvoidingView>
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