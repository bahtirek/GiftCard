import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import MainView from '@/components/common/MainView'
import { useNavigation } from '@react-navigation/native'
import SearchInput from '@/components/search/SearchInput'
import { Colors } from '@/styles/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GiftCardsStackParamList } from '@/navigation/navigation-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GiftCardList from '@/components/GiftCard/GiftCardList'

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'AllGiftCards'>;

const AllCardsScreen = ({ route }: Props) => {
  const { search } = route.params || {};
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleSearch = (searchQuery: string) => {
    console.log('handle', searchQuery);
  }

  const onScroll = (isOutOfView: boolean) => {
    setShowSearchInput(isOutOfView)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        if (showSearchInput) {
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
  }, [navigation, showSearchInput])

  return (
    <MainView>
      <View>
        <GiftCardList search={search} onScroll={onScroll}/>
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