import { View, Text, FlatList, Image, RefreshControl, Alert, ActivityIndicator, StyleSheet  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import {} from 'react-native';
import { GiftCardType } from '@/types';
import allGiftCards from '@/data/giftcards';
import GiftCard from '@/components/GiftCard/GiftCard';
import icons from '@/data/icons';
import SearchInput from '@/components/search/SearchInput';
import CategoryList from '@/components/category/CategoryList';
import { Colors } from '@/styles/constants';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GiftCardsStackParamList, RootStackParamList } from '@/navigation/navigation-types';

const Stack = createNativeStackNavigator<RootStackParamList>();
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GiftCardsNavigation'>;

export default function HomeScreen() {
  const [items, setItems] = useState<GiftCardType[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCardType[]>([])
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  let searchQuery = '';

  useEffect(() => {
    api();
  }, [])

  const api = () => {
    setTimeout(() => {

      setGiftCards(allGiftCards);
    }, 2000)
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  const handleSearch = (query: string) => {
    searchQuery = query;
  }
  
  const handleSearchButton = () => {
    console.log('test', searchQuery);
    
    navigation.navigate('GiftCardsNavigation', {
      screen: 'AllGiftCards',
      params: { search: searchQuery },
    });
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <FlatList 
        style={styles.flatList}
        data={giftCards}
        keyExtractor={(item) => item.id ? String(item.id) : Math.random().toString()}
        renderItem={({item}) => (
          <GiftCard giftCard={item} customeStyle={styles.giftCard} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <SearchInput handleSearchQuery={handleSearch} handleSearchButton={handleSearchButton} />

            <View style={styles.categoryListContainer}>
              <CategoryList />

              <Text style={styles.trendingText}>Trending</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Loading...</Text>
        )}
        keyboardDismissMode='on-drag'
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    paddingHorizontal: 0, // px-6
  },
  headerContainer: {
    paddingTop: 16, // pt-4
    paddingHorizontal: 16, // px-4
  },
  categoryListContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 16, // pt-8
  },
  trendingText: {
    color: Colors.primary, // text-primary
    fontSize: 24, // text-2xl
    fontFamily: 'PRegular',
    marginTop: 8
  },
  giftCard: {
    marginBottom: 24, // mb-6
  },
  emptyText: {
    color: Colors.secondary700, // text-secondary-700
    fontSize: 18, // text-lg
  },
});
