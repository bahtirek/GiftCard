import { View, Text, FlatList, ActivityIndicator, StyleSheet  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import GiftCard from '@/components/GiftCard/GiftCard';
import SearchInput from '@/components/search/SearchInput';
import CategoryList from '@/components/category/CategoryList';
import { Colors } from '@/styles/constants';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation-types';
import { useQuery } from '@tanstack/react-query';
import { fetchTenItems } from '@/api/gift-cards/search.api';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
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
  
  const handleSearchButton = () => {
    navigation.navigate('GiftCardsNavigation' as never );
  }

  const goToCardDetailsScreen = (giftCardId: string) => {
    navigation.navigate('GiftCardsNavigation', {
      screen: 'GiftCardDetails',
      params: { giftCardId }
    });
  }
  
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <SearchInput handleSearchButton={handleSearchButton} />
          <View style={styles.categoryListContainer} >
          <CategoryList />
        </View>
      </View>
     <FlatList 
        style={styles.flatList}
        data={data?.items}
        keyExtractor={(item) => item.id ? String(item.id) : Math.random().toString()}
        renderItem={({item}) => (
          <GiftCard giftCard={item} customeStyle={styles.giftCard} goToCardDetailsScreen={goToCardDetailsScreen} />
        )}
        ListHeaderComponent={() => (
          <View>
            {(isLoading || isRefetching) && <ActivityIndicator />}
            {!(isLoading || isRefetching) && <Text style={styles.trendingText}>Trending</Text>}

          </View>
        )}
        ListEmptyComponent={() => (
          <ListEmptyComponent />
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
    paddingHorizontal: 0,
    flex: 1
  },
  headerContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  categoryListContainer: {
    width: '100%',
    height: 110,
    paddingTop: 16,
  },
  trendingText: {
    color: Colors.primary,
    fontSize: 24,
    fontFamily: 'PRegular',
    marginTop: 8,
    paddingLeft: 16
  },
  giftCard: {
    marginBottom: 24,
  },
  emptyText: {
    color: Colors.secondary700,
    fontSize: 18,
  },
});
