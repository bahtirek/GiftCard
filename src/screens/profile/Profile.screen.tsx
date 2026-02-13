import ListItem from '@/components/common/ListItem'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const navigation = useNavigation();

  const profileMenuItems = [
    {id: 1, label: "Account", path: 'AccountScreen'},
    {id: 2, label: "Orders", path: 'OrdersScreen'},
    {id: 3, label: "Redeem", path: 'RedeemScreen'},
    {id: 4, label: "Dashboard", path: 'DashboardScreen'},
  ]
  //const pathname = usePathname();

  const goToScreen = (path: string) => {
    navigation.navigate(path as never)
  }
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      {
        profileMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      }
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})