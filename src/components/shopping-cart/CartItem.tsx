import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { CartItemType } from '@/types'
import { flex, mb, mr, mt, pa, pl, pt, px, py, text } from '@/styles/styles'
import RecipientDetails from './RecepientDetails'
import IconButton from '../UI/buttons/IconButton'
import { useCartStore } from '@/stores/cart.store'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from '@/navigation/navigation-types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<CartStackParamList>();
type NavigationProp = NativeStackNavigationProp<CartStackParamList, 'EditCartItem'>;

type CartItemPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
}

const CartItem = ({ cartItem }: CartItemPropType) => {
  const {amount, phone, email, giftCard, note, orderDate, name, image} = cartItem;
  const navigation = useNavigation<NavigationProp>();

  const addItemToEdit = useCartStore(state => state.addItemToEdit);
  const deleteItemFromCart = useCartStore(state => state.deleteItemFromCart);

  const editCartItem = () => {
    addItemToEdit(cartItem);
    navigation.navigate('EditCartItem', { cartItem: cartItem });
  }

  const deleteCartItem = () => {
    Alert.alert('Remove Gift Card', 'Are sure you want to remove from cart?', [
      {
        text: 'Cancel',
        onPress: () => () => {return},
        style: 'cancel',
      },
      {text: 'Remove', onPress: () => deleteItemFromCart(cartItem.id!)},
    ]);
  }
  return (
    <View style={[px.md, pt.md]}>
      <View style={[]}>
        <View style={[]}>
          <View style={[styles.imageTextWrapper, mb.md]}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode='cover'
              />
            </View>
            <View style={[pl.md]}>
              <Text style={[text.lg, text.primary]} numberOfLines={1}>{name}</Text>
              <View style={[styles.valueRow]}>
                <Text style={[text.md, text.grey]}>Value:</Text>
                <Text style={[text.md, text.grey]}>{amount}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[text.md, text.grey, mb.xs]}>Recepient:</Text>
            <View>
              {!!email && 
                <RecipientDetails label="Email" description={email} />
              }
              {!!phone &&
                <RecipientDetails label="Phone" description={phone} />
              }
              {!!note &&
                <RecipientDetails label="Gift note" description={note} />
              }
            </View>
          </View>
        </View>
        {
          !!orderDate &&
          <View style={[mt.xl]}>
            <RecipientDetails label="Ordered on" description={orderDate} />
          </View>
        }
        {
          !(!!orderDate) &&
          <View style={[mt.xl, mb.lg, flex.row, flex.justifyEnd]}>
            <View style={[mr.xl]}>
              <IconButton icon={"edit"} onPress={editCartItem} />
            </View>
            <View style={[mr.md]}>
              <IconButton icon={"trash-2"} onPress={deleteCartItem} />
            </View>
          </View>
        }
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  imageTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    marginTop: 8,
  }
})