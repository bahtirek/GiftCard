import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import VerifyPhone from '@/components/profile/account/VerifyPhone'
import VerifyPin from '@/components/profile/account/VerifyPin'

const AccountScreen = () => {
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false)

  const phoneIsSubmitted= () => {
    setIsPhoneSubmitted(true)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {!isPhoneSubmitted && <VerifyPhone phoneIsSubmitted={phoneIsSubmitted} />}
      {isPhoneSubmitted && <VerifyPin />}
      
    </ScrollView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})