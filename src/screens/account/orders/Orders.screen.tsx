import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { flex } from '@/styles/styles'
import CartItemShort from '@/components/shopping-cart/CartItemShort'
import { useIsFocused } from '@react-navigation/native'
import { fetchAllOrders, fetchOrders } from '@/api/orders/orders.api'
import { useOrdersQuery } from '@/api/orders/orders.query'
import { CartItemType } from '@/types'
import { get } from 'node_modules/axios/index.cjs'

const OrdersScreen = () => {
  const [orders, setOrders] = useState<CartItemType[]>([]);
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

  useEffect(() => {
    //setOrders(data?.pages.flatMap((page) => page.items) ?? []);
    //const data = fetchOrders();
    //setOrders(data);
    //fetchOrders();
    getOrders();
  }, [isFocused]);

  const getOrders = async () => {
    const data = await fetchOrders();
    console.log('orders', data.data);

    setOrders(data.data);
  }

  const items: CartItemType[] = data?.pages.flatMap((page) => page.items) ?? [];
  console.log('orders', items);
  

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