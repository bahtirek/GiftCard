import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import React, { useState } from 'react';
import { CartItemType } from 'src/types';
import { Colors } from '@/styles/constants';
import { pa } from '@/styles/styles';


type GiftCardPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
}

const GiftCard = ({cartItem}: GiftCardPropType, ) => {
  const {amount, giftCard } = cartItem;
  const {label} = giftCard!;

  return (
    <View style={[pa.md]}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, gap: 6}}>
          <Text style={{fontSize: 16, color: Colors.primary}} numberOfLines={1}>{label}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, color: Colors.secondary800}}>Value:</Text>
            <Text style={{fontSize: 16, color: Colors.secondary800}}>{amount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
});

export default GiftCard