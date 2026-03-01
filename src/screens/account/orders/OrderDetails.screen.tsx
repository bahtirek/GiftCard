import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '@/navigation/navigation-types';
import CartItem from '@/components/shopping-cart/CartItem';
import { CartItemType } from '@/types';
import { fetchOrderById } from '@/api/orders/orders.api';

type Props = NativeStackScreenProps<AccountStackParamList, 'OrderDetailsScreen'>;

const OrderDetailsScreen = ({ route }: Props) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState<CartItemType>({});

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async() => {
    const orderData = await fetchOrderById(orderId);    
    setOrder(orderData.data);
  }

  return (
    <CartItem cartItem={order} />
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({})