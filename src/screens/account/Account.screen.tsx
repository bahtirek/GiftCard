import ListItem from '@/components/common/ListItem'
import SpinnerModal from '@/components/UI/modals/SpinnerModal';
import VerifyPhoneModal from '@/components/UI/modals/VerifyPhoneModal';
import { useProfileStore } from '@/stores/profile.store';
import { flex, pt } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
  const [toggleVerifyPhoneModal, setToggleVerifyPhoneModal] = useState(false)
  const [toggleSpinnerModal, setToggleSpinnerModal] = useState(false)
  const navigation = useNavigation();
  const { profile, isPhoneVerified } = useProfileStore();
  const [pathAfterPhoneVerification, setPathAfterPhoneVerification] = useState('')

  const profileMenuItems = [
    { id: 1, label: "Profile", path: 'ProfileScreen' },
    { id: 2, label: "Orders", path: 'OrdersScreen' },
  ]

  const supportMenuItems = [
    { id: 3, label: "Redeem", path: 'RedeemScreen' },
  ]

  const adminMenuItems = [
    { id: 4, label: "Dashboard", path: 'DashboardScreen' },
  ]

  const goToScreen = (path: string) => {
    if ((path === 'DashboardScreen' || path === 'RedeemScreen') && !isPhoneVerified()) {
      setPathAfterPhoneVerification(path)
      sendSMS();
    } else {
      navigation.navigate(path as never)
    }
  }

  const sendSMS = () => {
    setToggleSpinnerModal(true)
    setTimeout(() => {
      setToggleSpinnerModal(false);
      setToggleVerifyPhoneModal(true)
    }, 2000)
  }

  const onModalClose = () => {
    setToggleVerifyPhoneModal(false)
    if (isPhoneVerified()) {
      navigation.navigate(pathAfterPhoneVerification as never)
    }
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      {
        profileMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => { goToScreen(item.path) }} />
        })
      }
      {profile.role === 'support' || profile.role === 'admin' && (
        supportMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => { goToScreen(item.path) }} />
        })
      )}
      {profile.role === 'admin' && (
        adminMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => { goToScreen(item.path) }} />
        })
      )}
      <VerifyPhoneModal toggleModal={toggleVerifyPhoneModal} onModalClose={onModalClose} showPinOnly={true} />
      <SpinnerModal toggleModal={toggleSpinnerModal} />
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
})