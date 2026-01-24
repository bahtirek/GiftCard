import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/stores/cart.store';
import CartItem from '@/components/shopping-cart/CartItem';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { commonStyles, pa } from '@/styles/styles';

const CartScreen = () => {
const items = useCartStore(state => state.items)

  const checkout = () => {
    console.log('checkout');
    //router.navigate('/basket/payment-details')
  }

  const openSearchModal = () => {
    //router.navigate('/gift-cards')
  }

  return (
    <SafeAreaView edges={["left", "right"]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id!}
        renderItem={({item }) => (
          <CartItem cartItem={item} />
        )}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={() => (
          <ListEmptyComponent
            icon={"shopping-bag"}
            title='No Gift cards Found'
          />
        )}
      />
      {
        items.length > 0 &&
        <View style={[]}>
          <CustomButton label='Checkout' handlePress={checkout} />
        </View>
      }
    </SafeAreaView>
  );
}

export default CartScreen

const styles = StyleSheet.create({
  container: {

  }
})