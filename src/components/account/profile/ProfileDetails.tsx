import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { flex, mb, mt, pt, px } from '@/styles/styles'
import { useProfileStore } from '@/stores/profile.store';
import { useIsFocused } from '@react-navigation/native';
import RecepientDetails from '@/components/shopping-cart/RecepientDetails';
import IconButton from '@/components/UI/buttons/IconButton';

const ProfileDetails = () => {
  const getProfile = useProfileStore(state => state.getProfile);
  const [profile, setProfile] = React.useState(getProfile());
  const isFocused = useIsFocused();

  useEffect(() => {
    const profile = getProfile();
    console.log('profile', profile);
    
    setProfile(profile);
  }, [isFocused]);

  const editPhone = () => {
    // navigate to edit phone screen
  }

  const editName = () => {
    // navigate to edit name screen
  }

  return (
    <View style={[px.md, pt.md]}>
      {!!profile.phone &&
        <View style={[mt.lg, flex.row, flex.justifyBetween]}>
          <RecepientDetails label="Phone" description={profile?.phone} />
          <IconButton icon={"edit"} onPress={editPhone} />
        </View>
      }
      {(!!profile.firstName || !!profile.lastName) &&
        <View style={[mt.xl, mb.lg, flex.row, flex.justifyBetween]}>
          <RecepientDetails label="Name" description={`${profile?.firstName} ${profile?.lastName}`} />
          <IconButton icon={"edit"} onPress={editName} />
        </View>
      }
    </View>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({
  imageTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    marginTop: 8,
  }
})