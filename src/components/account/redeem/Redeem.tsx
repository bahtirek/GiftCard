import { View, Text, StyleSheet, Platform, Alert, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { InputValueType } from '@/types';
import { maskCurrency } from '@/utils/masks';
import { validateRedeemAmount } from '@/utils/input-validation';
import CustomInput from '@/components/UI/forms/CustomInput';
import CustomButton from '@/components/UI/buttons/CustomButton';


const Redeem = ({ balance, token, amount, onRedeemedCompleted, onRefund }: any) => {
  const [redeemAmount, setRedeemAmount] = useState<InputValueType>({value: '', isValid: true});
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState<string>('')

/*   useFocusEffect(
    useCallback(() => {
      resetForm()
    }, [])
  ); */

  const handleAmountInput = (amount: InputValueType) => {
    setRedeemAmount(amount)
  }

  const onRedeem = () => {
    isFormCompleted();
    if(redeemAmount.value && redeemAmount.isValid) {
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        const remBalance = amount - parseInt(redeemAmount.value.replace(/\s/g, ''))
        setRemainingBalance(remBalance.toString());
        setShowSuccessModal(true)
        //setShowErrorModal(true)
      }, 2000);
      
    }
  }

  const resetForm =() => {
    setRedeemAmount({value: ''});
  }

  const isFormCompleted = () => {
    if(!redeemAmount.value) {
      console.log('Missing data', "Please select amount")
      return Alert.alert('Missing data', "Please select amount")
    }
  }

  const redeemed = () => {
    onRedeemedCompleted(true)
  }

  const amountRules = [
    (val: string) => validateRedeemAmount(val, balance) || `Amount can't be more than ${balance}`
  ]

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.row}>
          <Text style={styles.modalText}>Gift card amount:</Text>
          <Text style={styles.modalText}>{maskCurrency(amount)}</Text>
        </View>
        <View style={styles.rowBalance}>
          <Text style={styles.modalText}>Balance:</Text>
          <Text style={styles.modalText}>{maskCurrency(balance)}</Text>
        </View>
        <TouchableOpacity onPress={onRefund}>
          <Text style={styles.modalText}>Last transaction details</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <CustomInput
            onInput={(amount: InputValueType) => { handleAmountInput(amount) }}
            keyboardType="number-pad"
            placeholder='Redeem amount'
            mask='currency'
            rules={amountRules}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label={'Redeem'} handlePress={onRedeem}/>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ActivityIndicator size={'large'} color={"#FF4416"} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
      >
        <View style={styles.modalBackground} >
          <View style={styles.shadow}>
            <Text style={styles.modalText}>Redeemed!</Text>
            <View >
              <Text style={styles.modalText}>Remaining balance:</Text>
              <Text style={styles.modalText}>{maskCurrency(remainingBalance)}</Text>
            </View>
            <CustomButton label='OK' handlePress={redeemed} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showErrorModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.shadow}>
            <Text style={styles.modalText}>Oops!</Text>
            <View >
              <Text style={styles.modalText}>Couldn't redeem. Please try again.</Text>
            </View>
            <CustomButton label='Rescan' handlePress={redeemed} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 24,
    ...Platform.select({
      ios: {
        paddingTop: 50
      }
    })
  },
    inner: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 16,
  },
  rowBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  lastTransaction: {
    fontSize: 14,
    color: '#FF4416',
    textAlign: 'left',
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 32,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingBottom: 64,
  },
  modalContent: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FF4416',
    marginBottom: 24,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  },
  phonePrefix: {
    paddingLeft: 30
  },
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
})

export default Redeem;