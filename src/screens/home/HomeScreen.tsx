import { View, Text, FlatList, ActivityIndicator, StyleSheet  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import { GiftCardType } from '@/types';
import allGiftCards from '@/data/giftcards';
import GiftCard from '@/components/GiftCard/GiftCard';
import SearchInput from '@/components/search/SearchInput';
import CategoryList from '@/components/category/CategoryList';
import { Colors } from '@/styles/constants';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation-types';
import { useQuery } from '@tanstack/react-query';
import { fetchTenItems } from '@/api/search.api';
const Stack = createNativeStackNavigator<RootStackParamList>();
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GiftCardsNavigation'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    isError,
    error
  } = useQuery({
    queryKey: ['items'],
    queryFn: () => fetchTenItems(10),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  const handleSearchButton = () => {
    navigation.navigate('GiftCardsNavigation' as never );
  }
  
  
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <FlatList 
        style={styles.flatList}
        data={data?.items}
        keyExtractor={(item) => item.id ? String(item.id) : Math.random().toString()}
        renderItem={({item}) => (
          <GiftCard giftCard={item} customeStyle={styles.giftCard} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <SearchInput handleSearchButton={handleSearchButton} />

            <View style={styles.categoryListContainer}>
              <CategoryList />

              <Text style={styles.trendingText}>Trending</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Gift Cards found</Text>
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
