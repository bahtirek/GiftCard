import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { InputValueType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'

type CardNameEditPropType = {
  presetValue: string |undefined,
  showModal: boolean
  closeModal: () => void,
  updateName: (name: string) => void,
}

const CardNameEdit = ({presetValue, closeModal, showModal, updateName}: CardNameEditPropType) => {
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [name, setName] = useState<InputValueType>({value: '', isValid: false})

  const handleNameInput = (name: InputValueType) => {
    setName(name)
  }

  const onUpdateButtonClicked = () => {
    setIsNameTouched(true)
    if(!name.isValid) return;
    updateName(name.value)
  }

  const onCancelButtonClicked = () => {
    closeModal()
  }

  const nameRules = [
    (val: string) => !!val || 'Field is required',
  ]

  return (
    <CommonModal
      toggleModal={showModal}
      title="Edit name"
      content={(
        <View style={[]}>
          <CustomInput 
            onInput={(name: InputValueType) => {handleNameInput(name)}} 
            placeholder='Name'
            rules={nameRules}
            maxLength={50}
            isTouched={isNameTouched}
            presetValue={presetValue}
          />
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

export default CardNameEdit

const styles = StyleSheet.create({})