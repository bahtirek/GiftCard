import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputValueType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'

type PriceEditPropType = {
  presetValue: string[],
  showModal: boolean
  closeModal: () => void,
  updatePrice: (price: any) => void,
}



const PriceEdit = ({presetValue, closeModal, showModal, updatePrice}: PriceEditPropType) => {
  const [prices, setPrices] = useState<InputValueType[]>([{value: '', isValid: false}, {value: '', isValid: false}, {value: '', isValid: false}])

  useEffect(() => {
    const preset = prices.map((item, index) => item = {value: presetValue[index] || '', isValid: true});
    setPrices(preset)
  }, [presetValue])
  

  const handlePriceInput = (price: InputValueType, index: number) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = price
    setPrices(updatedPrices)
  }

  const onUpdateButtonClicked = () => {
    if(!prices[0].isValid) return;
    const updatedPrices: string[] = []
    prices.forEach((item) => {
      if (item && item.value) {
        updatedPrices.push(item.value)
      }
    })
    updatePrice(updatedPrices)
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
              onInput={(price: InputValueType) => {handlePriceInput(price, 0)}} 
              placeholder='Price 1'
              rules={priceRules}
              keyboardType="number-pad"
              mask='currency'
              presetValue={presetValue[0] || ''}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput 
              onInput={(price: InputValueType) => {handlePriceInput(price, 1)}} 
              placeholder='Price 2'
              keyboardType="number-pad"
              mask='currency'
              presetValue={presetValue[1] || ''}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput 
              onInput={(price: InputValueType) => {handlePriceInput(price, 2)}} 
              placeholder='Price 2'
              keyboardType="number-pad"
              mask='currency'
              presetValue={presetValue[2] || ''}
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