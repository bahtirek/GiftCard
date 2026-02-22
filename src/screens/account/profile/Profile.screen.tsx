import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import ProfileRegisteration from '@/components/account/profile/ProfileRegisteration'
import ProfileDetails from '@/components/account/profile/ProfileDetails'
import { useIsFocused } from '@react-navigation/native'

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const [isProfileConfirmed, setIsProfileConfirmed] = useState(false)
  const [isProfileOnEdit, setIsProfileOnEdit] = useState(false)
  const [editProfile, setEditProfile] = useState('');
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
    setIsProfileOnEdit(false);
    setEditProfile('');
  }

  const onProfileEdit = (field: string) => {
    setEditProfile(field);
    setIsProfileOnEdit(true);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {(!isProfileConfirmed || isProfileOnEdit) && <ProfileRegisteration onProfileCoifirmed={onProfileCoifirmed} editProfile={editProfile} />}
      {(isProfileConfirmed && !isProfileOnEdit) && <ProfileDetails onProfileEdit={onProfileEdit} />}
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})