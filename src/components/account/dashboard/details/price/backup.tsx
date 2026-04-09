import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputValueType, PriceType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'

type PriceEditPropType = {
  presetValue: PriceType[],
  showModal: boolean
  closeModal: () => void,
  updatePrice: (price: any) => void,
}



const PriceEdit = ({presetValue, closeModal, showModal, updatePrice}: PriceEditPropType) => {
  const [isPriceTouched, setIsPriceTouched] = useState(false);
  const [prices, setPrices] = useState<InputValueType[]>([{value: '', isValid: false}, {value: '', isValid: false}, {value: '', isValid: false}])
  const [updatedPrices, setUpdatedPrices] = useState<PriceType[]>([])
  const [priceOne, setPriceOne] = useState<InputValueType>({value: '', isValid: false})
  const [priceTwo, setPriceTwo] = useState<InputValueType>({value: '', isValid: false})
  const [priceThree, setPriceThree] = useState<InputValueType>({value: '', isValid: false})

  useEffect(() => {
    //const preset = prices.map((item, index) => item = {value: presetValue[index].amount || '', isValid: true});
    //setPrices(preset)
  }, [presetValue])
  

  const handlePriceOneInput = (price: InputValueType) => {
    //const newPrices
    setPriceOne(price)
  }

  const handlePriceTwoInput = (price: InputValueType) => {
    setPriceTwo(price)
  }

  const handlePriceThreeInput = (price: InputValueType) => {
    setPriceThree(price)
  }

  const onUpdateButtonClicked = () => {
    setIsPriceTouched(true)
    if(!prices[0].isValid) return;
    console.log(priceOne);
    console.log(priceThree);
    console.log(priceTwo);
    
    //updatePrice(price.value)
  }

  const onCancelButtonClicked = () => {
    closeModal()
  }

  const priceRules = [
    (val: string) => !!val || 'Field is required',
  ]

  return (
    <CommonModal
      toggleModal={showModal}
      title="Edit price"
      content={(
        <View style={[]}>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput 
              onInput={(price: InputValueType) => {handlePriceOneInput(price)}} 
              placeholder='Price 1'
              rules={priceRules}
              keyboardType="number-pad"
              mask='currency'
              presetValue={presetValue[0]?.amount || ''}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput 
              onInput={(price: InputValueType) => {handlePriceTwoInput(price)}} 
              placeholder='Price 2'
              keyboardType="number-pad"
              mask='currency'
              presetValue={presetValue[1]?.amount || ''}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput 
              onInput={(price: InputValueType) => {handlePriceThreeInput(price)}} 
              placeholder='Price 2'
              keyboardType="number-pad"
              mask='currency'
              presetValue={presetValue[2]?.amount || ''}
            />
          </View>
        </View>
      )}
      action={(
        <View style={[commonStyles.buttonContainer]}>
          <CustomButton label='Update' handlePress={onUpdateButtonClicked} />
          <CustomButton label='Cancel' handlePress={onCancelButtonClicked} secondary containerStyles={[commonStyles.secondaryButton]} />
        </View>
      )}
    />
  )
}

export default PriceEdit

const styles = StyleSheet.create({})