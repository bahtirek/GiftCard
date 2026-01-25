import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@/stores/cart.store';
import CartItem from '@/components/shopping-cart/CartItem';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { flex, pb, pt, px } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const items = useCartStore(state => state.items)
  const navigation = useNavigation();

  const checkout = () => {
    navigation.navigate('Payment' as never);
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flex]}>
      <View style={[flex.flex]}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          ListFooterComponentStyle={styles.flatListFooter}
          data={items}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <CartItem cartItem={item} />
          )}
          keyboardDismissMode='on-drag'
          ListEmptyComponent={() => (
            <ListEmptyComponent
              icon={"shopping-bag"}
              title='No Gift cards Found'
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            <View>
              {items.length > 0 && (
                <View style={[px.md, pb.lg, pt.xl]}>
                  <CustomButton label='Checkout' handlePress={checkout} />
                </View>
              )}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default CartScreen

const styles = StyleSheet.create({
  flatListContent: {
    flexGrow: 1,
  },
  flatListFooter: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  separator: {
    backgroundColor: '#E2E2E2',
    height: 1,
    marginHorizontal: 16,
  }
})