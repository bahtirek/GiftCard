import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { commonStyles, flex, mb, pt, text } from '@/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ListItem from '@/components/common/ListItem'
import { useAccountStore } from '@/stores/account.store'
import IconButton from '@/components/UI/buttons/IconButton'

const DashboardScreen = () => {
  const { account } = useAccountStore();
  const navigation = useNavigation();
      
  useEffect(() => {
    if(!account) {
      openAccountslistScreen()
    }
  }, [])

  const openAccountslistScreen = () => {
    navigation.navigate('DashboardAccountsListScreen' as never)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: account?.name,
      headerRight: () => {
        return <IconButton icon='more-vertical' onPress={openAccountslistScreen} color="#FCAF58" />
      }
    });
  }, [navigation, account])


  const goToScreen = (path: string) => {
    navigation.navigate(path as never)
  }

  const dashboardMenuItems = [
    {id: 1, label: "Purchased", path: 'DashboardPurchasedScreen'},
    {id: 2, label: "Redeemed", path: 'DashboardRedeemedScreen'},
    {id: 3, label: "Account details", path: 'DashboardAccountDetailsScreen'},
    {id: 3, label: "Redeemers", path: 'DashboardRedeemersScreen'},
  ]

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      {
        dashboardMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      }
    </SafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})