import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles, flex, mb, pt, text } from '@/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ListItem from '@/components/common/ListItem'

const DashboardListScreen = () => {
  const navigation = useNavigation();

  const dashboardMenuItems = [
    {id: 1, label: "Purchased", path: 'PurchasedScreen'},
    {id: 2, label: "Redeemed", path: 'RedeemedScreen'},
    {id: 3, label: "Redeemed", path: 'RedeemedScreen'},
  ]
  //const pathname = usePathname();

  const goToScreen = (path: string) => {
    navigation.navigate(path as never)
  }
  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      {
        dashboardMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      }
      {/* <View style={[commonStyles.container]}>
        <View style={[flex.row, flex.justifyBetween, mb.md]}>
          <Text style={[text.md, text.grey]}>Purchased total:</Text>
          <Text style={[text.md, text.grey]}>10 000 000</Text>
        </View>
        <View style={[flex.row, flex.justifyBetween, mb.md]}>
          <Text style={[text.md, text.grey]}>Redeemed total:</Text>
          <Text style={[text.md, text.grey]}>1 000 000</Text>
        </View>
      </View> */}
    </SafeAreaView>
  )
}

export default DashboardListScreen

const styles = StyleSheet.create({})