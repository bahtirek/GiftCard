import { StyleSheet} from 'react-native'
import React, { useEffect} from 'react'
import GiftCardList from '@/components/GiftCard/GiftCardList'
import { GiftCardType, ProfileType } from '@/types'
import { useAccountsQuery } from '@/api/gift-cards/search.query'

type AccountListProp = {
  profile: ProfileType,
  onSetAccount: (account: GiftCardType) => void
}

const AccountsList = ({profile, onSetAccount}: AccountListProp) => {
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

  const onPress = (giftCardProp: GiftCardType) => {
    onSetAccount(giftCardProp);
  }

  return (
    <GiftCardList
      items={accounts}
      loading={isFetchingNextPage}
      refreshing={isRefetching}
      hasNextPage={!!hasNextPage}
      onLoadMore={fetchNextPage}
      onRefresh={refetch}
      onPress={onPress}
    />
  )
}

export default AccountsList

const styles = StyleSheet.create({})