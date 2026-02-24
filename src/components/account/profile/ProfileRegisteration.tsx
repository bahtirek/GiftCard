import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import VerifyPin from './VerifyPin'
import VerifyPhone from './VerifyPhone'
import { commonStyles, flex } from '@/styles/styles'
import { useIsFocused } from "@react-navigation/native";
import ProfileName from './ProfileName'
import { isPinNotExpired } from '@/utils/utils'

type ProfileRegisterationProp = {
  onProfileCoifirmed: () => void,
  editProfile: string
}

const ProfileRegisteration = ({onProfileCoifirmed, editProfile}: ProfileRegisterationProp) => {
  const isFocused = useIsFocused();
  const [displayPhoneVerify, setDisplayPhoneVerify] = useState(false);
  const [displayProfileName, setDisplayProfileName] = useState(false);
  const [displayPinVerify, setDisplayPinVerify] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getProfile = useProfileStore(state => state.getProfile)

  const checkIfPhoneIsSubmitted = () => {
    const profile = getProfile();
    if(profile.isRegistered ) {
      
      if(profile.tempPhone && profile.timestamp && isPinNotExpired(profile.timestamp)) {
        setDisplayPinVerify(true);
        setDisplayPhoneVerify(false);
        setDisplayProfileName(false);
      } else if (!profile.nameUpdatedSkiped) {
        setDisplayPinVerify(false);
        setDisplayPhoneVerify(false);
        setDisplayProfileName(true);
      }
    } else {
      if(profile.timestamp && isPinNotExpired(profile.timestamp)) {
        setDisplayPinVerify(true);
        setDisplayPhoneVerify(false);
      } else {
        setDisplayPinVerify(false);
        setDisplayPhoneVerify(true);  
      }
      setDisplayProfileName(false);
      return
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
      setDisplayPhoneVerify(false);
      setDisplayProfileName(true);
    } else if(editProfile === 'phone') {
      setDisplayPhoneVerify(true);
      setDisplayProfileName(false);
    }
    setDisplayPinVerify(false);
  }

  const phoneIsSubmitted = () => {
    setDisplayPinVerify(true);
    setDisplayPhoneVerify(false);
  }

  const displayNameOnProfileConfirmed = () => {
    if(!isEditing) {
      setDisplayProfileName(true);
      setDisplayPinVerify(false);
      //onProfileCoifirmed();
    } else {
      onProfileCoifirmed();
    }
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