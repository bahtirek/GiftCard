import { StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { flex, pt } from '@/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ListItem from '@/components/common/ListItem'
import { useAccountStore } from '@/stores/account.store'
import IconButton from '@/components/UI/buttons/IconButton'
import { useProfileStore } from '@/stores/profile.store'
import AccountList from '@/components/account/dashboard/AccountList'
import { GiftCardType } from '@/types'

const DashboardScreen = () => {
  const { profile } = useProfileStore()
  const { account, setAccount } = useAccountStore();
  const navigation = useNavigation();

  const openAccountslistScreen = () => {
    navigation.navigate('DashboardAccountsListScreen' as never)
  }

  const onSetAccount = (account: GiftCardType) => {
    setAccount(account)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: account?.name,
      headerRight: () => {
        if (profile.accounts && profile.accounts?.length > 1) {
          return <IconButton icon='more-vertical' onPress={openAccountslistScreen} color="#FCAF58" />
        }
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
    {id: 4, label: "Redeemers", path: 'DashboardRedeemersScreen'},
  ]

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      { account? (
        dashboardMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path)}}/>
        })
      ) : (
        <AccountList
          profile={profile}
          onSetAccount={onSetAccount}
        />
      )
      }
    </SafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})