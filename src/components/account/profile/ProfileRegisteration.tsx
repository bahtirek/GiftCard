import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import VerifyPin from './VerifyPin'
import VerifyPhone from './VerifyPhone'
import { commonStyles, flex } from '@/styles/styles'
import { useIsFocused } from "@react-navigation/native";
import ProfileName from './ProfileName'

type ProfileRegisterationProp = {
  onProfileCoifirmed: () => void,
  editProfile: string
}

const ProfileRegisteration = ({onProfileCoifirmed, editProfile}: ProfileRegisterationProp) => {
  const isFocused = useIsFocused();
  const [displayPhoneVerify, setIsDisplayPhoneVerify] = useState(false);
  const [displayProfileName, setDisplayProfileName] = useState(false);
  const [displayPinVerify, setDisplayPinVerify] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getProfile = useProfileStore(state => state.getProfile)

  const checkIfPhoneIsSubmitted = () => {
    const profile = getProfile()
    if(profile.isRegistered && !profile.nameUpdatedSkiped) {
      setDisplayProfileName(true);
    } else if(profile.timestamp && verifyTime(profile.timestamp)){
      setIsDisplayPhoneVerify(false);
    } else {
      setDisplayPinVerify(true);
    }
  }

  useEffect(() => {
    if(editProfile) {
      setProfileToEdit();
      setIsEditing(true);
    } else {
      checkIfPhoneIsSubmitted()
    }
  }, [isFocused]);

  const setProfileToEdit = () => {
    if(editProfile === 'name') {
      setIsDisplayPhoneVerify(false);
      setDisplayProfileName(true);
    } else if(editProfile === 'phone') {
      setIsDisplayPhoneVerify(true);
      setDisplayProfileName(false);
    }
    setDisplayPinVerify(false);
  }

  const phoneIsSubmitted = () => {
    setDisplayPinVerify(true);
  }

  const displayNameOnProfileConfirmed = () => {
    setDisplayProfileName(true);
  }

  const verifyTime = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.abs(now - timestamp) / 1000;   
    return diffInSeconds < 60;
  }

  return (
    <View style={[flex.flex]}>
      {displayPhoneVerify && <VerifyPhone phoneIsSubmitted={phoneIsSubmitted} onSkipOrUpdate={onProfileCoifirmed} isEditing={isEditing} />}
      {displayPinVerify && <VerifyPin onProfileCoifirmed={displayNameOnProfileConfirmed} />}
      {displayProfileName && <ProfileName onSkipOrUpdate={onProfileCoifirmed} isEditing={isEditing} />}
    </View>
  )
}

export default ProfileRegisteration

const styles = StyleSheet.create({})