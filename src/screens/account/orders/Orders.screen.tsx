import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { flex } from '@/styles/styles'
import CartItemShort from '@/components/shopping-cart/CartItemShort'
import { useIsFocused } from '@react-navigation/native'
import { useOrdersQuery } from '@/api/orders/orders.query'
import { CartItemType } from '@/types'

const OrdersScreen = () => {
  const isFocused = useIsFocused();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useOrdersQuery();

  const orders: CartItemType[] = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <View style={[flex.flex]}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={orders}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <>
            <CartItemShort cartItem={item} key={item.id} />
            </>
          )}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator style={{ marginVertical: 16 }} />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          keyboardDismissMode='on-drag'
        />
      </View>
    </SafeAreaView>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});