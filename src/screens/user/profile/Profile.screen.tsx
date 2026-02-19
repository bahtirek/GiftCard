import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import ProfileRegisteration from '@/components/account/profile/ProfileRegisteration'
import ProfileDetails from '@/components/account/profile/ProfileDetails'

const ProfileScreen = () => {
  const profile = useProfileStore(state => state.profile)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {!profile.isRegistered && <ProfileRegisteration />}
      {profile.isRegistered && <ProfileDetails />}
      
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})