import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { CartItemType } from '@/types'

type GiftCardPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
}

const CartItem = ({ cartItem }: GiftCardPropType) => {
  const {amount, phone, email, giftCard, note, orderedDate} = cartItem;
  const {label, thumbnail} = giftCard!;
  return (
    <View>
      <Text>{label}</Text>
      <Image source={{uri: thumbnail}} />
      <Text>{amount}</Text>
      <Text>{phone}</Text>
      <Text>{email}</Text>
      <Text>{note}</Text>
      <Text>{orderedDate}</Text>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({})