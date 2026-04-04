import { StyleSheet} from 'react-native'
import React, { useEffect} from 'react'
import { flex, pt} from '@/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useProfileStore } from '@/stores/profile.store'
import GiftCardList from '@/components/GiftCard/GiftCardList'
import { GiftCardType } from '@/types'
import { useAccountsQuery } from '@/api/gift-cards/search.query'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { AccountStackParamList, MainTabParamList} from '@/navigation/navigation-types'
import { useAccountStore } from '@/stores/account.store'

type Props = NativeStackScreenProps<AccountStackParamList, 'DashboardScreen'>;
type NavigationProp = NativeStackNavigationProp<MainTabParamList, 'AccountNavigation'>;

const DashboardAccountsListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { profile} = useProfileStore();
  const { setAccount } = useAccountStore();

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

  }, [])

  const onPress = (giftCardProp: GiftCardType) => {
    setAccount(giftCardProp);
    navigation.goBack();
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
          onPress={onPress}
        />
    </SafeAreaView>
  )
}

export default DashboardAccountsListScreen

const styles = StyleSheet.create({})