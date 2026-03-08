import { fetchOrderById } from '@/api/orders/orders.api';
import QRCodeScanner from '@/components/account/redeem/QrCodeScanner';
import Redeem from '@/components/account/redeem/Redeem';
import Refund from '@/components/account/redeem/Refund';
import CustomButton from '@/components/UI/buttons/CustomButton';
import SpinnerModal from '@/components/UI/modals/SpinnerModal';
import { flex, mt } from '@/styles/styles';
import { CartItemType } from '@/types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';


const RedeemScreen = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRedeemer, setShowRedeemer] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [lastTransactionDetails, setLastTransactionDetails] = useState({amount: '100 000', date: '15 February 2025', redeemer: 'John Doe'})
  const [order, setOrder] = useState<CartItemType>({});

  useFocusEffect(
    useCallback(() => {
      setShowError(false);
      setShowRedeemer(false);
      setShowSpinner(false);
      setShowScanner(true);
      setShowRefund(false);
    }, [])
  );

  const handleScan = async (data: string) => {
    setShowSpinner(true);
    if(data) {
      setShowScanner(false);
      setShowSpinner(false);
      const orderData = await fetchOrderById(data)
      if(orderData.data.id) {
        setOrder(orderData.data);
        setShowRedeemer(true)
      }
    } else {
      setShowError(true)
    }
  }

  const handleRescan = () => {
    setShowError(false)
    setShowRedeemer(false)
    setShowScanner(true)
  }

  const onRefundCompleted = (value: boolean) => {
    if(true) {
      /* Update balance */
    }
    setShowRefund(false)
    setShowRedeemer(true)
  }

  const onRefund = () => {
    setShowRefund(true)
    setShowRedeemer(false)
  }

  return (
    <View style={[styles.container]}>
      {/* <View style={[styles.fullWhiteContainer, flex.flex]}>
        <View style={[mt.auto]}>
          <CustomButton label="Scan again" handlePress={handleRescan} />
        </View>
      </View> */}
      {
        showScanner && 
        <QRCodeScanner onScan={handleScan}></QRCodeScanner>
      }
      {
        showError &&
        <View style={styles.fullWhiteContainer}>
          <Text style={styles.titleCentered}>Qr code is invalid or exired!</Text>

          <CustomButton label="Scan again" handlePress={handleRescan} />
        </View>
      }
      {
        showRedeemer &&
        <Redeem order={order} onRedeemedCompleted={handleRescan} onRefund={onRefund} />
      }
      {
        showRefund &&
        <Refund lastTransactionDetails={lastTransactionDetails} onRefundCompleted={onRefundCompleted} />
      }
      <SpinnerModal toggleModal={showSpinner} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  titleCentered: {
  fontSize: 20,            // text-xl
  color: '#1F2937',        // secondary-800 (adjust to your theme)
  flex: 1,
  marginTop: 48,           // mt-12 (12 * 4)
  alignSelf: 'center',     // self-center
},
fullScreenOverlay: {
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',  // bg-black/40
  paddingBottom: 64,                  // pb-16 (16 * 4)
},
fullWhiteContainer: {
  width: '100%',
  height: '100%',
  paddingHorizontal: 16,
  paddingVertical: 24,            // p-6 (6 * 4)
  backgroundColor: '#FFFFFF',
}
})

export default RedeemScreen;