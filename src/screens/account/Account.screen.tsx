import ListItem from '@/components/common/ListItem'
import SpinnerModal from '@/components/UI/modals/SpinnerModal';
import VerifyPhoneModal from '@/components/UI/modals/VerifyPhoneModal';
import { profileStorage } from '@/storage-services/profile.storage';
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
  const { profile } = useProfileStore();
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

  const goToScreen = async(path: string) => {
    const isPhoneVerified = await checkIsPhoneVerified();
    if ((path === 'DashboardScreen' || path === 'RedeemScreen') && !isPhoneVerified) {
      setPathAfterPhoneVerification(path)
      sendSMS();
    } else {
      navigation.navigate(path as never)
    }
  }

  const checkIsPhoneVerified = async() => {
    const phoneConfirmationTime = await profileStorage.getPhoneConfirmationTime();
    if (!phoneConfirmationTime) return false;
    const currentTime = Date.now();
    const timeDifference = currentTime - phoneConfirmationTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference < 1; 
  }

  const sendSMS = () => {
    setToggleSpinnerModal(true)
    setTimeout(() => {
      setToggleSpinnerModal(false);
      setToggleVerifyPhoneModal(true)
    }, 2000)
  }

  const onModalClose = async () => {
    setToggleVerifyPhoneModal(false)
    const isPhoneVerified = await checkIsPhoneVerified();
    if (isPhoneVerified) {
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