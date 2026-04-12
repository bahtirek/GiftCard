import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AddressType, InputValueType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'
import { validateLength } from '@/utils/input-validation'

type CardAddressEditPropType = {
  presetValue: AddressType | undefined,
  showModal: boolean
  closeModal: () => void,
  updateAddress: (address: AddressType) => void,
}

const CardAddressEdit = ({ presetValue, closeModal, showModal, updateAddress }: CardAddressEditPropType) => {
  const [isAddressTouched, setIsAddressTouched] = useState(false);
  const [lineOne, setLineOne] = useState<InputValueType>({ value: '', isValid: false })
  const [lineTwo, setLineTwo] = useState<InputValueType>({ value: '', isValid: false })
  const [city, setCity] = useState<InputValueType>({ value: '', isValid: false })
  const [zip, setZip] = useState<InputValueType>({ value: '', isValid: false })
  const [isLineOneTouched, setIsLineOneTouched] = useState(false);
  const [isLineTwoTouched, setIsLineTwoTouched] = useState(false);
  const [isCityTouched, setIsCityTouched] = useState(false);
  const [isZipTouched, setIsZipTouched] = useState(false);

  const handleLineOneInput = (LineOne: InputValueType) => {
    setLineOne(LineOne)
  }

  const handleLineTwoInput = (LineTwo: InputValueType) => {
    setLineTwo(LineTwo)
  }

  const handleCityInput = (City: InputValueType) => {
    setCity(City)
  }

  const handleZipInput = (Zip: InputValueType) => {
    setZip(Zip)
  }

  const lineOneRules = [
    (val: string) => !!val || 'Field is required',
  ]

  const cityRules = [
    (val: string) => !!val || 'Field is required',
  ]

  const zipRules = [
    (val: string) => validateLength(val, 6) || 'Postal code must be 6 digits long'
  ]

  const onUpdateButtonClicked = () => {
    if(!lineOne.isValid || !city.isValid || !zip.isValid) return;
    updateAddress(
      {line_one: lineOne.value, line_two: lineTwo.value, city: city.value, zip: zip.value}
    )
  }

  const onCancelButtonClicked = () => {
    closeModal()
  }



  return (
    <CommonModal
      toggleModal={showModal}
      title="Edit address"
      content={(
        <View style={[]}>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(lineOne: InputValueType) => { handleLineOneInput(lineOne) }}
              placeholder='Line One'
              rules={lineOneRules}
              maxLength={50}
              isTouched={isLineOneTouched}
              presetValue={presetValue?.line_one}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(lineTwo: InputValueType) => { handleLineTwoInput(lineTwo) }}
              placeholder='LineTwo'
              maxLength={50}
              isTouched={isLineTwoTouched}
              presetValue={presetValue?.line_two}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(city: InputValueType) => { handleCityInput(city) }}
              placeholder='City'
              rules={cityRules}
              maxLength={50}
              isTouched={isCityTouched}
              presetValue={presetValue?.city}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(zip: InputValueType) => { handleZipInput(zip) }}
              placeholder='Zip'
              rules={zipRules}
              maxLength={50}
              isTouched={isZipTouched}
              presetValue={presetValue?.zip}
              keyboardType='number-pad'
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

export default CardAddressEdit

const styles = StyleSheet.create({})