import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/styles/constants';
import RedeemerDetails from './RedeemerDetails';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import { RedeemerType } from '@/types';
import { useAccountStore } from '@/stores/account.store';
import { useRedeemersQuery } from '@/api/redeemer/redeemer.query';
import { useIsFocused } from '@react-navigation/native';


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
  const store = useAccountStore();
  const isFocused = useIsFocused()

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useRedeemersQuery([]);

  useEffect(() => {
    if (!data) {
      fetchNextPage();
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const allRedeemers = data?.pages?.flatMap((page) => page?.redeemers ?? []) ?? [];
      store.setRedeemers(allRedeemers);
    } else {
      fetchNextPage()
    }
  }, [data]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={store.redeemers}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => (
        <View>
         <RedeemerDetails redeemer={item} />
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