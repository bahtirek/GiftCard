import { View, Text, StyleSheet, Platform, Alert, Modal, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { CartItemType, InputValueType } from '@/types';
import { maskCurrency } from '@/utils/masks';
import { validateRedeemAmount } from '@/utils/input-validation';
import CustomInput from '@/components/UI/forms/CustomInput';
import CustomButton from '@/components/UI/buttons/CustomButton';
import SpinnerModal from '@/components/UI/modals/SpinnerModal';
import CommonModal from '@/components/UI/modals/CommonModal';
import { flex, mr, text } from '@/styles/styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { updateBalance } from '@/api/orders/orders.api';
import { InteractionManager } from "react-native";
import { getDate } from '@/utils/utils';

type RedeemProps = {
  order: CartItemType, 
  onRedeemedCompleted: () => void, 
  onRefund: () => void
}

const Redeem = ({ order, onRedeemedCompleted, onRefund }: any) => {
  const {amount, id, balance} = order;
  const [redeemAmount, setRedeemAmount] = useState<InputValueType>({value: '', isValid: true});
  const [toggleSpinnerModal, setToggleSpinnerModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState<string>('')
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [redeemDate, setRedeemDate] = useState('')
  const isFocused = useIsFocused();
  const customInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if(balance) {
      setRemainingBalance(balance);
      setRedeemDate(order.redeemDate)
    } else {
      setRemainingBalance(amount)
    } 
  }, [isFocused, balance])
  

  const handleAmountInput = (amount: InputValueType) => {
    setRedeemAmount(amount)
  }

  const onRedeem = () => {
    setShowRedeemModal(true)
  }

  const onRedeemSubmit = async() => {
    if (toggleSpinnerModal) return; //prevent double input

    isFormCompleted();

    if(!redeemAmount.value || !redeemAmount.isValid) return;
    const balance = parseInt(remainingBalance.replace(/\s/g, ""));
    const redeemNum = parseInt(redeemAmount.value.replace(/\s/g, ""));
    const remBalance = balance - redeemNum;
    const dateNow = getDate();
    

    setShowRedeemModal(false)
    setToggleSpinnerModal(true)

    // allow UI to render spinner first
    await new Promise(resolve => setImmediate(resolve));

    try {
      await updateBalance(id, remBalance.toString(), dateNow);
      setRemainingBalance(remBalance.toString());
      setRedeemDate(dateNow)
      resetForm();
    } catch {
      setShowErrorModal(true);
    } finally {
      setToggleSpinnerModal(false);
    }
  }

  const resetForm =() => {
    if (customInputRef.current) {
      customInputRef.current.clear();
      setRedeemAmount({value: ''});
    }
  }

  const isFormCompleted = () => {
    if(!redeemAmount.value) {
      return Alert.alert('Missing data', "Please select amount")
    }
  }

  const amountRules = [
    (val: string) => validateRedeemAmount(val, balance || amount) || `Amount can't be more than ${balance || balance}`
  ]

  const onCancel = () => {
    onRedeemedCompleted(true)
  }

  const onRedeemSubmitCancel = () => {
    setShowRedeemModal(false)
  }

  const closeErrorModal = () => {
    setShowErrorModal(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.row}>
          <Text style={[text.md, text.grey]}>Gift card amount:</Text>
          <Text style={[text.md, text.grey]}>{maskCurrency(amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[text.md, text.grey]}>Balance:</Text>
          <Text style={[text.md, text.grey]}>{maskCurrency(remainingBalance)}</Text>
        </View>
        { redeemDate &&
          <View style={styles.row}>
            <Text style={[text.md, text.grey]}>Redeemed on:</Text>
            <Text style={[text.md, text.grey]}>{redeemDate}</Text>
          </View>
        }
        <View style={styles.buttonContainer}>
          {
            (parseInt(remainingBalance) > 0) &&
            <CustomButton label={'Redeem'} handlePress={onRedeem}/>
          }
          <CustomButton label={'Cancel'} handlePress={onCancel} containerStyles={styles.skipButton} secondary />
        </View>
      </View>
      <SpinnerModal toggleModal={toggleSpinnerModal}></SpinnerModal>       
      <CommonModal
        toggleModal={showRedeemModal}
        title="Redeem"
        content={(
          <View>
            <View style={[flex.row, flex.justifyBetween]}>
              <Text style={[text.md, text.grey]}>Remaining balance:</Text>
              <Text style={[text.md, text.grey]}>{maskCurrency(remainingBalance)}</Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomInput
                onInput={(amount: InputValueType) => { handleAmountInput(amount) }}
                keyboardType="number-pad"
                placeholder='Redeem amount'
                mask='currency'
                rules={amountRules}
                ref={customInputRef}
              />
            </View>
          </View>
        )}
        action={(
          <View style={styles.buttonContainer}>
            <CustomButton label='Submit' handlePress={onRedeemSubmit} />
            <CustomButton label={'Cancel'} handlePress={onRedeemSubmitCancel} containerStyles={styles.skipButton} secondary />
          </View>
        )}
      />
      <CommonModal
        toggleModal={showErrorModal}
        title="Oops..."
        content={(
          <View style={[flex.row, flex.justifyBetween]}>
            <Text style={[text.md, text.grey]}>Couldn't redeem. Please try again.</Text>
          </View>
        )}
        action={(
          <CustomButton label='Ok' handlePress={closeErrorModal} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  row: {
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
    marginTop: 32,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  skipButton: {
    marginTop: 16,
    width: '100%',
  },
})

export default Redeem;