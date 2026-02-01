import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import giftCards from '@/data/giftcards'
import GiftCard from '@/components/GiftCard/GiftCard'
import MainView from '@/components/common/MainView'
import { useNavigation } from '@react-navigation/native'
import SearchInput from '@/components/search/SearchInput'
import { Colors } from '@/styles/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GiftCardsStackParamList } from '@/navigation/navigation-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'AllGiftCards'>;

const AllCardsScreen = ({ route }: Props) => {
  const { search } = route.params || {};
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const goToCardDetailsScreen = (giftCardId: string) => {
    console.log('Go to card details for card id:', giftCardId);

    navigation.navigate('GiftCardDetails' as never);
  }

  const handleSearch = (searchQuery: string) => {
    console.log('handle', searchQuery);
    // Implement search functionality here
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        if (showSearchIcon) {
          return (
            <View style={[
              styles.headerContainer,
              {
                ...Platform.select({
                  android: {
                    paddingTop: insets.top + 8
                  },
                  ios: {
                    paddingTop: insets.top
                  },
                })
              }
            ]}>
              <SearchInput handleSearchQuery={handleSearch} searchQueryProp={search} />
            </View>
          )
        }
        return (
          <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
            <Text style={[styles.headerTitle]}>Gift Cards</Text>
          </View>
        )
      },
    });
  }, [navigation, showSearchIcon])

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowSearchIcon(offsetY > 65);
  };


  return (
    <MainView>
      <View>
        <FlatList
          data={giftCards}
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
            <Text style={styles.emptyText}>Loading...</Text>
          )}
          keyboardDismissMode='on-drag'
          onScroll={handleScroll}
          scrollEventThrottle={150}
        />
      </View>
    </MainView>
  )
}

export default AllCardsScreen

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
  },
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