import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/styles/constants';
import RedeemerDetails from './RedeemerDetails';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import { RedeemerType } from '@/types';
import { useProfileStore } from '@/stores/profile.store';
import { useAccountStore } from '@/stores/account.store';
import { useRedeemersQuery } from '@/api/redeemer/redeemer.query';


type RedeemerListProp = {
  items: RedeemerType[];
  loading: boolean;
  refreshing: boolean;
  hasNextPage: boolean;
  onScroll?: (isOutOfView: boolean) => void,
  onLoadMore: () => void;
  onRefresh: () => void;
  onPress: (redeemer: RedeemerType) => void
}

const RedeemersList = () => {
  const { profile} = useProfileStore();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useRedeemersQuery([]);
  
  const redeemers: RedeemerType[] = data?.pages.flatMap((page) => page.redeemers) ?? [];

  const onPress = (redeemer: RedeemerType) => {
    /* setAccount(giftCardProp);
    navigation.goBack(); */
  }

  return (
    <FlatList
      data={redeemers}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => (
        <View>
         <RedeemerDetails />
        </View>
      )}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={{ marginVertical: 16 }} />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
      ListEmptyComponent={() => (
        <View>
          <ListEmptyComponent />
        </View>
      )}
      keyboardDismissMode='on-drag'
    />
  )
}

export default RedeemersList

const styles = StyleSheet.create({
  iconButton: {
    marginRight: 16
  },
  listHeaderContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  emptyText: {
    color: Colors.secondary700,
    fontSize: 18,
  },
})