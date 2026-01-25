import { View, Text, StyleSheet, Modal, ActivityIndicator, Alert, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { maskCurrency } from '@/utils/masks';
import { CartItemType } from '@/types';
import CustomButton from '@/components/UI/buttons/CustomButton';
import CartItemShort from '@/components/shopping-cart/CartItemShort';
import { useCartStore } from '@/stores/cart.store';
import { usePaymentStore } from '@/stores/payment.store';
import { flex, pa, pb, pt, px, text } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';


const SubmitOrder = () => {
  const items = useCartStore(state => state.items);
  const deleteAllItemsFromCart = useCartStore(state => state.deleteAllItemsFromCart);
  const payment = usePaymentStore(state => state.payment);
  const removePaymentDetails = usePaymentStore(state => state.removePaymentDetails);
  const [totalAmount, setTotalAmount] = useState('');
  const [maskedCreditCard, setMaskedCreditCard] = useState('**** **** **** ****');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getTotalAmount();
    maskCreditCard();
  }, [])

  const getTotalAmount = () => {
    const total = items.reduce((total: number, item: CartItemType) => {
      let amount = '';
      if (item.otherAmount) {
        amount = item.otherAmount.replace(/\s/g, '')
      } else {
        amount = item.amount!.replace(/\s/g, '')
      }
      return total + parseInt(amount)
    }, 0)
    setTotalAmount(maskCurrency(total.toString()))
  }

  const maskCreditCard = () => {
    if (payment == null || !payment.creditCard) return;
    const lastFour = payment.creditCard!.slice(-4);
    let remaining = payment.creditCard!.slice(0, payment.creditCard!.length - 4);
    remaining = remaining.replace(/\d/g, "*");

    setMaskedCreditCard(`${remaining}${lastFour}`)
  }

  const onSubmit = () => {
    setShowModal(true);
    setTimeout(() => {
      /* if (Math.floor(Math.random() * 10) > 8) {
        Alert.alert('Something went wrong!', 'Please try later', [
          {text: 'OK', onPress: () => {
            navigation.navigate('basket' as never)}},
        ]);
        router.replace('/basket')
      } else {
        navigation.navigate('ConfirmationScreen' as never);
    } */
      deleteAllItemsFromCart();
      removePaymentDetails();
      setShowModal(false)
      navigation.navigate('ConfirmationScreen' as never);
    }, 1000)
  }

  const submitOrder = () => {
    console.log('Order submitted');
  }
  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={[flex.flex]}>
        {/* <Text style={[pa.md, text.grey, text.lg]}>Gift cards:</Text> */}
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
          data={items}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <CartItemShort cartItem={item} key={item.id} />
          )}
          keyboardDismissMode='on-drag'
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            <View style={[pa.md]}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ paddingRight: 16, fontSize: 16, color: '#6B7280' }}>Total:</Text>
                <Text style={{ fontSize: 16, color: '#1F2937' }}>{totalAmount}</Text>
              </View>
              <Text style={{ fontSize: 20, color: '#4B5563', marginTop: 32 }}>Payment method:</Text>
              <View>
                <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: '#4B5563', paddingRight: 8 }}>Credit Card #</Text>
                  <Text style={{ fontSize: 16, color: '#6B7280' }}>{maskedCreditCard}</Text>
                </View>
                <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                  <Text style={{ fontSize: 12, color: '#4B5563', paddingRight: 8 }}>Exp. Date</Text>
                  <Text style={{ fontSize: 16, color: '#6B7280' }}>{payment?.expDate}</Text>
                </View>
              </View>
              <View style={[pb.lg, pt.xl]}>
                <CustomButton label='Submit order' handlePress={onSubmit} />
              </View>
            </View>
          }
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SubmitOrder;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E2E2E2',
    height: 1,
    marginHorizontal: 16,
  }
})