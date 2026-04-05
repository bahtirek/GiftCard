import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { InputValueType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'

type DescriptionEditPropType = {
  presetValue: string |undefined,
  showModal: boolean
  closeModal: () => void,
  updateDescription: (name: string) => void,
}

const DescriptionEdit = ({presetValue, closeModal, showModal, updateDescription}: DescriptionEditPropType) => {
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const [name, setDescription] = useState<InputValueType>({value: '', isValid: false})

  const handleDescriptionInput = (name: InputValueType) => {
    setDescription(name)
  }

  const onUpdateButtonClicked = () => {
    setIsDescriptionTouched(true)
    if(!name.isValid) return;
    updateDescription(name.value)
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
            onInput={(name: InputValueType) => {handleDescriptionInput(name)}} 
            placeholder='Description'
            rules={nameRules}
            isTouched={isDescriptionTouched}
            presetValue={presetValue}
            multiline={true}
            numberOfLines={10}
            textarea={true}
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

export default DescriptionEdit

const styles = StyleSheet.create({})