import { Alert, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useProfileStore } from '@/stores/profile.store'
import ProfileRegisteration from '@/components/account/profile/ProfileRegisteration'
import ProfileDetails from '@/components/account/profile/ProfileDetails'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import IconButton from '@/components/UI/buttons/IconButton'

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const [isProfileConfirmed, setIsProfileConfirmed] = useState(false)
  const [isProfileOnEdit, setIsProfileOnEdit] = useState(false)
  const [editProfile, setEditProfile] = useState('');
  const getProfile = useProfileStore(state => state.getProfile)
  const navigation = useNavigation();
  const { profile, logout } = useProfileStore()

  useEffect(() => {
    toggleComponents();
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if(profile?.phone) {
          return <IconButton icon='more-vertical' onPress={showLogoutModal} color="#FCAF58" />
        }
      }
    });
  }, [navigation, profile])

  const showLogoutModal = () => {
    Alert.alert('Confirm Logout', 'Are you sure?', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Delete', onPress: () => onLogout() },
    ]);
  }

  const onLogout = () => {
    logout()
  }

  const toggleComponents = () => {
    const profile = getProfile();

    /* If profile is not registered or profile is registered and has temporary phone show profile registration */
    if(!profile.isRegistered || profile.isRegistered && profile.tempPhone) {
      setIsProfileConfirmed(false);
      return;
    }

    /* If profile is registered and (firstName or lastName) is not empty or nameUpdatedSkipped is true, show profile details */
    if(profile.isRegistered && (profile.nameUpdatedSkiped || (profile.firstName || profile.lastName))) {
      setIsProfileConfirmed(true);
    }
  }

  const onProfileCoifirmed = () => {
    if(isProfileOnEdit) {
      setIsProfileOnEdit(false);
      setEditProfile('');
    } else {
      setIsProfileConfirmed(getProfile().isRegistered);
    }
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