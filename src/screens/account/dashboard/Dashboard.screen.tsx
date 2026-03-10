import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles, flex, mb, pt, text } from '@/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ListItem from '@/components/common/ListItem'
import { useProfileStore } from '@/stores/profile.store'
import { fetchAccounts } from '@/api/gift-cards/search.api'
import GiftCardList from '@/components/GiftCard/GiftCardList'
import { GiftCardType } from '@/types'
import { useAccountsQuery } from '@/api/gift-cards/search.query'

const DashboardScreen = () => {
  const navigation = useNavigation();
  //const [accounts, setAccounts] = useState<GiftCardType[]>([]);
  const {profile} = useProfileStore();

    const {
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      refetch,
      isFetchingNextPage,
      isRefetching,
    } = useAccountsQuery(profile.accounts || []);
  
    const accounts: GiftCardType[] = data?.pages.flatMap((page) => page.accounts) ?? [];

  useEffect(() => {
    //getAccounts()
  }, [])
  
/*   const getAccounts = async() => {
    if(profile.accounts && profile.accounts.length > 1) {
      const accounts = await fetchAccounts(profile.accounts);
      console.log(accounts);
      setAccounts(accounts)
    }
  } */
 
  const goToScreen = (path: string) => {
    navigation.navigate(path as never)
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      <GiftCardList
          items={accounts}
          loading={isFetchingNextPage}
          refreshing={isRefetching}
          hasNextPage={!!hasNextPage}
          onLoadMore={fetchNextPage}
          onRefresh={refetch}
          onScroll={() => {}}
        />
    </SafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})