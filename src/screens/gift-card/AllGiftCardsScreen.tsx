import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import MainView from '@/components/common/MainView'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import SearchInput from '@/components/search/SearchInput'
import { Colors } from '@/styles/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GiftCardsStackParamList } from '@/navigation/navigation-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GiftCardList from '@/components/GiftCard/GiftCardList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchStore } from '@/stores/search.store'
import { GiftCardType } from '@/types'
import { useSearchQuery } from '@/api/gift-cards/search.query'

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'AllGiftCards'>;

const AllCardsScreen = ({ route }: Props) => {
  const isFocused = useIsFocused();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [ query, setQuery ] = useState('')
  const { search } = route.params || {};
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useSearchQuery({query});

  const items: GiftCardType[] = data?.pages.flatMap((page) => page.items) ?? [];

  const onScroll = (isOutOfView: boolean) => {
    setShowSearchInput(isOutOfView)
  }
  
  useEffect(() => {
    if(isFocused) {
      setQuery(searchQuery)
    }
  }, [searchQuery, isFocused])
  
  useEffect(() => {
    if(searchQuery) {
      setQuery(searchQuery)
    } else {
      setQuery('%%%')
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearchHeader />
    });
  }, [navigation, showSearchInput])

  const SearchHeader = () => {
    return (
      <View style={[
        styles.headerContainer,
        {
          ...Platform.select({
            android: { paddingTop: insets.top + 8 },
            ios: { paddingTop: insets.top },
          })
        }
      ]}>
        <SearchInput searchQueryProp={search} handleSearchButton={()=>{}} />
      </View>
    )
  }

  return (
    <MainView>
      {isLoading && <ActivityIndicator />}
      <View>
        <GiftCardList
          items={items}
          loading={isFetchingNextPage}
          refreshing={isRefetching}
          hasNextPage={!!hasNextPage}
          onLoadMore={fetchNextPage}
          onRefresh={refetch}
          onScroll={onScroll}
        />
      </View>
    </MainView>
  )
}

export default AllCardsScreen

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
      }
    })
  },
  headerTitle: {
    fontFamily: 'SpaceMono-Regular',
    fontWeight: '500',
    fontSize: 17,
    paddingTop: 10,
    color: Colors.primary,
    ...Platform.select({
      android: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '700',
        width: '100%',
        paddingTop: 18,
        paddingBottom: 10,
      },
    }),
  },
})