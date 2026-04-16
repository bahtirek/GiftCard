import ListItem from '@/components/common/ListItem'
import { useProfileStore } from '@/stores/profile.store';
import { flex, pt } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
  const navigation = useNavigation();
  const { profile } = useProfileStore();  

  const profileMenuItems = [
    {id: 1, label: "Profile", path: 'ProfileScreen'},
    {id: 2, label: "Orders", path: 'OrdersScreen'},
  ]

  const supportMenuItems = [
    {id: 3, label: "Redeem", path: 'RedeemScreen'},
  ]

  const adminMenuItems = [
    {id: 4, label: "Dashboard", path: 'DashboardScreen'},
  ]

  const goToScreen = (path: string) => {
    navigation.navigate(path as never)
  }
  
  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      {
        profileMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      }
      { profile.role === 'support' || profile.role === 'admin' && (
        supportMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      )}
      { profile.role === 'admin' && (
        adminMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      )}
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
})