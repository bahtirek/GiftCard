import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import VerifyPin from './VerifyPin'
import VerifyPhone from './VerifyPhone'
import { commonStyles, flex } from '@/styles/styles'
import { useIsFocused } from "@react-navigation/native";

const ProfileRegisteration = () => {
  const isFocused = useIsFocused();
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false)
  const getProfile = useProfileStore(state => state.getProfile)

  const checkIfPhoneIsSubmitted = () => {
    const profile = getProfile()
    console.log('teim', getProfile());
    
    if(profile.timestamp && verifyTime(profile.timestamp)) {
      setIsPhoneSubmitted(true);
    }
  }

  useEffect(() => {  
    checkIfPhoneIsSubmitted()
  }, [isFocused]);
  
  const phoneIsSubmitted = () => {
    setIsPhoneSubmitted(true);
  }

  const verifyTime = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.abs(now - timestamp) / 1000;
    console.log(now - timestamp);
    console.log(timestamp);
    console.log(now);
    console.log(diffInSeconds < 60);
    
    return diffInSeconds < 60;
  }

  return (
    <View style={[flex.flex]}>
      {!isPhoneSubmitted && <VerifyPhone phoneIsSubmitted={phoneIsSubmitted} />}
      {isPhoneSubmitted && <VerifyPin />}
    </View>
  )
}

export default ProfileRegisteration

const styles = StyleSheet.create({})