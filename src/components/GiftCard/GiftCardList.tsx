import { FlatList, Platform, StyleSheet, Text, View, ActivityIndicator, RefreshControl, } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/styles/constants'
import SearchInput from '../search/SearchInput'
import { useNavigation } from '@react-navigation/native'
import giftCards, { allGiftCards } from '@/data/giftcards'
import GiftCard from './GiftCard'
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, Item } from '@/api/search.api';

type GiftCardListProp = {
  search?: string,
  onScroll: (isOutOfView: boolean) => void
}

const GiftCardList = ({search, onScroll}: GiftCardListProp) => {
  let query = '';
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const navigation = useNavigation();
  

  const goToCardDetailsScreen = (giftCardId: string) => {
    navigation.navigate('GiftCardDetails' as never);
  }

  const handleSearch = (searchQuery: string) => {
    console.log('handle123', searchQuery);
    query = searchQuery
    setDebouncedQuery(query)
  }
  
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    onScroll(offsetY > 65)
  };

  return (
    <FlatList
      data={allGiftCards}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => (
        <GiftCard giftCard={item} showDescription goToCardDetailsScreen={goToCardDetailsScreen} />
      )}
      ListHeaderComponent={() => (
        <View style={styles.listHeaderContainer}>
          <SearchInput handleSearchQuery={handleSearch} searchQueryProp={search} />
        </View>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>No results found</Text>
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