import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import ProfileRegisteration from '@/components/account/profile/ProfileRegisteration'
import ProfileDetails from '@/components/account/profile/ProfileDetails'
import { useIsFocused } from '@react-navigation/native'

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const [isProfileConfirmed, setIsProfileConfirmed] = useState(false)
  const getProfile = useProfileStore(state => state.getProfile)

  useEffect(() => {
    const profile = getProfile();
    
    if(profile.isRegistered && (profile.firstName || profile.lastName)) {
      setIsProfileConfirmed(true);
    } else {
      setIsProfileConfirmed(false);
    }
  }, [isFocused]);

  const onProfileCoifirmed = () => {
    setIsProfileConfirmed(getProfile().isRegistered);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {!isProfileConfirmed && <ProfileRegisteration onProfileCoifirmed={onProfileCoifirmed} />}
      {isProfileConfirmed && <ProfileDetails />}
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})