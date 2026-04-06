import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CartItemType, InputValueType } from '@/types';
import { validateAmount } from '@/utils/input-validation';
import RadioButton from '@/components/UI/forms/RadioButton';
import CustomInput from '@/components/UI/forms/CustomInput';
import { pb, text } from '@/styles/styles';

type PurchaseDetailsProps = {
  handleAmountChange: (amount: InputValueType) => void;
  priceSet: string[];
  isOtherAmountInputTouched: boolean;
  cartItemToEdit?: CartItemType;
}

const AmountDetails = ({ handleAmountChange, priceSet, isOtherAmountInputTouched, cartItemToEdit }: PurchaseDetailsProps) => {
  const [giftCardAmount, setGiftCardAmount] = useState<InputValueType>({ value: '', isValid: false });
  const [otherAmount, setOtherAmount] = useState<boolean>(false);
  const [presetValue, setPresetValue] = useState<string>('');

  useEffect(() => {
    setupEditing()
  }, [])

  const setupEditing = async() => {
    resetForm()
    if(!cartItemToEdit || !cartItemToEdit.id) return;
    const isAmountSelected = priceSet.some(price => price === cartItemToEdit);
    if (!isAmountSelected) {
      setGiftCardAmount({ value: cartItemToEdit.amount!, isValid: true });
      setPresetValue(cartItemToEdit.amount!);
      setOtherAmount(true);
    }  else {
      setGiftCardAmount({ value: cartItemToEdit.amount!, isValid: true });
    }
  }

  let minAmount = '';
  if (priceSet) {
    minAmount = priceSet[0];
  }

  const handleSelect = (amount: string) => {
    setOtherAmount(false);
    setGiftCardAmount({ value: amount, isValid: true });
    handleAmountChange({ value: amount, isValid: true });
  }

  const handleOtherSelect = () => {
    setGiftCardAmount({ value: '', isValid: false });
    handleAmountChange({ value: '', isValid: false });
    setOtherAmount(true);
  }

  const handleOtherAmountInput = (amount: InputValueType) => {
    if (amount.value !== '') {
      setGiftCardAmount(amount);
      handleAmountChange(amount);
    }
  }

  const resetForm =() => {
    setGiftCardAmount({ value: '', isValid: false });
  }

  const amountRules = [
    (val: string) => validateAmount(val, minAmount) || `Amount can't be less than ${minAmount}`
  ]

  return (
    <View style={styles.container}>
      <View>
        <Text style={[text.md, text.grey, pb.sm]}>Choose amount</Text>
        <View>
          {
            priceSet!.map((price) => {
              return <RadioButton 
                label={price}
                value={price}
                status={(!otherAmount && giftCardAmount.value === price) ? true : false}
                className="mt-4"
                onSelect={() => handleSelect(price)}
                key={price}
              />
            })
          }
          <RadioButton 
            label="other"
            value='other'
            status={otherAmount}
            className="mt-4"
            onSelect={handleOtherSelect}
          />
        </View>
        <View>
          { (otherAmount) &&
            <View style={{marginTop: 16}}>
              <CustomInput 
                onInput={(amount: InputValueType) => {handleOtherAmountInput(amount)}} 
                keyboardType="number-pad" 
                placeholder='Other amount' 
                mask='currency'
                presetValue={presetValue}
                rules={amountRules}
                isTouched={isOtherAmountInputTouched}
              />
            </View>
          }
        </View>
      </View>
    </View>
  )
}

export default AmountDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
})