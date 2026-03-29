import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CartItemType, InputValueType, PriceType } from '@/types';
import { validateAmount } from '@/utils/input-validation';
import RadioButton from '@/components/UI/forms/RadioButton';
import CustomInput from '@/components/UI/forms/CustomInput';
import { pb, text } from '@/styles/styles';

type PurchaseDetailsProps = {
  handleAmountChange: (amount: InputValueType) => void;
  priceSet: PriceType[];
  isOtherAmountInputTouched: boolean;
  cartItemToEdit?: CartItemType;
}

const AmountDetails = ({ handleAmountChange, priceSet, isOtherAmountInputTouched, cartItemToEdit }: PurchaseDetailsProps) => {
  const [giftCardAmount, setGiftCardAmount] = useState<InputValueType>({ value: '', isValid: false });
  const [otherAmount, setOtherAmount] = useState<boolean>(false);

  useEffect(() => {
    setupEditing()
  }, [])

  const setupEditing = async() => {
    resetForm()
    if(!cartItemToEdit || !cartItemToEdit.id) return;
    priceSet.some(price => price.amount === cartItemToEdit.amount) ? setGiftCardAmount({ value: cartItemToEdit.amount!, isValid: true }) : setOtherAmount(true);
  }

  let minAmount = '';
  if (priceSet) {
    minAmount = priceSet[0].amount;
  }

  const handleSelect = (amount: string) => {
    setOtherAmount(false);
    setGiftCardAmount({ value: amount, isValid: true });
    handleAmountChange({ value: amount, isValid: true });
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

  const handleOtherSelect = () => {
    setOtherAmount(!otherAmount);
    setGiftCardAmount({ value: '', isValid: false });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[text.md, text.grey, pb.sm]}>Choose amount</Text>
        <View>
          {
            priceSet!.map((price, index) => {
              return <RadioButton 
                label={price.amount}
                value={price.amount}
                status={giftCardAmount.value === price.amount ? true : false}
                className="mt-4"
                onSelect={() => handleSelect(price.amount)}
                key={price.id}
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
                valueToEdit={cartItemToEdit?.amount}
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