import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import giftCards from '@/data/giftcards'
import GiftCard from '@/components/GiftCard/GiftCard'
import MainView from '@/components/common/MainView'
import { useNavigation } from '@react-navigation/native'
import IconButton from '@/components/UI/buttons/IconButton'
import SearchInput from '@/components/search/SearchInput'
import { Colors } from '@/styles/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GiftCardsStackParamList, RootStackParamList } from '@/navigation/navigation-types'

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'AllGiftCards'>;

const AllCardsScreen = ({route}: Props) => {
  const { search } = route.params || {};
  console.log('search param in AllCardsScreen:', search);
  
  const navigation = useNavigation();

  const onSearchIconPress = () => {
    console.log('search icon');
    
  }

  const goToCardDetailsScreen = (giftCardId: string) => {
    console.log('Go to card details for card id:', giftCardId);
    
    navigation.navigate('GiftCardDetails' as never);
  }

  const handleSearch = (searchQuery: string) => {
    console.log('handle',searchQuery);
    // Implement search functionality here
  }

/*   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton icon={'search'} onPress={onSearchIconPress} styles={styles.iconButton}/>
      },
    });
  }, [navigation, onSearchIconPress]) */

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
          <View style={styles.headerContainer}>
            <SearchInput handleSearchQuery={handleSearch} searchQueryProp={search} />
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Loading...</Text>
        )}
        keyboardDismissMode='on-drag'
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
  headerContainer: {
    paddingTop: 16, // pt-4
    paddingHorizontal: 16, // px-4
  },
    emptyText: {
      color: Colors.secondary700, // text-secondary-700
      fontSize: 18, // text-lg
    },
})