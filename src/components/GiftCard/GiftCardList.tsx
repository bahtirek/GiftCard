import { FlatList, StyleSheet, Text, ActivityIndicator, RefreshControl, View, } from 'react-native'
import React from 'react'
import { Colors } from '@/styles/constants'
import { useNavigation } from '@react-navigation/native'
import GiftCard from './GiftCard'
import { GiftCardType } from '@/types'

type GiftCardListProp = {
  items: GiftCardType[];
  loading: boolean;
  refreshing: boolean;
  hasNextPage: boolean;
  onScroll: (isOutOfView: boolean) => void,
  onLoadMore: () => void;
  onRefresh: () => void;
}

const GiftCardList = ({onScroll, items, loading, refreshing, hasNextPage, onLoadMore, onRefresh,}: GiftCardListProp) => {
  const navigation = useNavigation();
  
  const goToCardDetailsScreen = (giftCardId: string) => {
    navigation.navigate('GiftCardDetails' as never);
  }
  
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    onScroll(offsetY > 65)
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => (
        <View>
         <GiftCard giftCard={item} showDescription goToCardDetailsScreen={goToCardDetailsScreen} />
        </View>
      )}
      onEndReached={() => {
        if (hasNextPage) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator style={{ marginVertical: 16 }} />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListEmptyComponent={() => (
        !loading ? (
          <Text style={styles.emptyText}>No results found</Text>
        ) : null
      )}
      keyboardDismissMode='on-drag'
      onScroll={handleScroll}
      scrollEventThrottle={150}
    />
  )
}

export default GiftCardList

const styles = StyleSheet.create({
  iconButton: {
    marginRight: 16
  },
  listHeaderContainer: {
    paddingTop: 16, // pt-4
    paddingHorizontal: 16, // px-4
  },
  emptyText: {
    color: Colors.secondary700, // text-secondary-700
    fontSize: 18, // text-lg
  }
})