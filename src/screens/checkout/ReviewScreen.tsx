import { View, Text, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { maskCurrency } from '@/utils/masks';
import { CartItemType } from '@/types';
import CustomButton from '@/components/UI/buttons/CustomButton';
import CartItemShort from '@/components/shopping-cart/CartItemShort';
import { useCartStore } from '@/stores/cart.store';
import { usePaymentStore } from '@/stores/payment.store';


const SubmitOrder = () => {
  const items = useCartStore(state => state.items);
  const payment = usePaymentStore(state => state.payment);
  const [totalAmount, setTotalAmount] = useState('');
  const [maskedCreditCard, setMaskedCreditCard] = useState('**** **** **** ****');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTotalAmount();
    maskCreditCard(); 
  }, [])
  
  const getTotalAmount = () => {
    const total = items.reduce((total: number, item: CartItemType) => {
      let amount = '';
      if(item.otherAmount) {
        amount = item.otherAmount.replace(/\s/g, '')
      } else {
        amount = item.amount!.replace(/\s/g, '')
      }
      return total + parseInt(amount)
    }, 0)
    setTotalAmount(maskCurrency(total.toString()))
  }

  const maskCreditCard = () => {
    if(payment == null || !payment.creditCard) return;
    const lastFour = payment.creditCard!.slice(-4);
    let remaining = payment.creditCard!.slice(0, payment.creditCard!.length - 4);
    remaining = remaining.replace(/\d/g, "*");
    
    setMaskedCreditCard(`${remaining}${lastFour}`)
  }

  const onSubmit = () => {
    setShowModal(true);
    setTimeout(() => {
      if(Math.floor(Math.random() * 10) > 8) {
        /* Alert.alert('Something went wrong!', 'Please try later', [
          {text: 'OK', onPress: () => router.replace('/basket')},
        ]); */
        //router.replace('/basket')
      } else {
        submitOrder();
        //router.replace('/order-confirmation-modal')
      }
      setShowModal(false)
    }, 1000)
  }

  const submitOrder = () => {
    console.log('Order submitted');
  }
  return (
    <SafeAreaView edges={["left", "right"]} style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView style={{paddingHorizontal: 16, paddingTop: 16}}>
        <Text style={{fontSize: 20, color: '#4B5563', marginBottom: 16}}>Gift cards:</Text>
        {
          items.map((item: CartItemType) => {
            return <CartItemShort cartItem={item} key={item.id}/>
          })
        }
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={{paddingRight: 16, fontSize: 16, color: '#6B7280'}}>Total:</Text>
        <Text style={{fontSize: 16, color: '#1F2937'}}>{totalAmount}</Text>
      </View>
      <Text style={{fontSize: 20, color: '#4B5563', marginTop: 32}}>Payment method:</Text>
      <View>
        <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 12, color: '#4B5563', paddingRight: 8}}>Credit Card #</Text>
          <Text style={{fontSize: 16, color: '#6B7280'}}>{maskedCreditCard}</Text>
        </View>
        <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32}}>
          <Text style={{fontSize: 12, color: '#4B5563', paddingRight: 8}}>Exp. Date</Text>
          <Text style={{fontSize: 16, color: '#6B7280'}}>{payment?.expDate}</Text>
        </View>
      </View>
      </ScrollView>
      <View style={{paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8}}>
        <CustomButton label='Submit order' handlePress={onSubmit} />
      </View>
      <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SubmitOrder