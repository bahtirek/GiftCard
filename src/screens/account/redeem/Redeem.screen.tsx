import QRCodeScanner from '@/components/account/redeem/QrCodeScanner';
import Redeem from '@/components/account/redeem/Redeem';
import Refund from '@/components/account/redeem/Refund';
import CustomButton from '@/components/UI/buttons/CustomButton';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';


const RedeemScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showRedeemer, setShowRedeemer] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [lastTransactionDetails, setLastTransactionDetails] = useState({amount: '100 000', date: '15 February 2025', redeemer: 'John Doe'})

/*   useFocusEffect(
    useCallback(() => {
      setShowError(false);
      setShowRedeemer(false);
      setShowModal(false);
      setShowScanner(true);
      setShowRefund(false);
    }, [])
  ); */

  const handleScan = (data: string) => {
    console.log("data", data);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setShowScanner(false)
      const result = 'error'
      if (result == 'error') {
        setShowError(true)
      }
    }, 2000);
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
    <View style={styles.container}>
     {/*  <Stack.Screen options={{title: 'Redeem', headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} /> */}
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
        <Redeem balance={'1000000'} token={'token'} amount={'1000000'} onRedeemedCompleted={handleRescan} onRefund={onRefund} />
      }
      {
        showRefund &&
        <Refund lastTransactionDetails={lastTransactionDetails} onRefundCompleted={onRefundCompleted} />
      }
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.fullScreenOverlay}>
        <View>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
        </View>
      </Modal>
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
  padding: 24,            // p-6 (6 * 4)
  backgroundColor: '#FFFFFF',
}
})

export default RedeemScreen;