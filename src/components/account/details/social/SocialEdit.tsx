import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SocialType, InputValueType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'
import { validateEmail, validateLength, validateWebsite } from '@/utils/input-validation'

type SocialEditPropType = {
  presetValue: SocialType | undefined,
  showModal: boolean
  closeModal: () => void,
  updateSocial: (social: SocialType) => void,
}

const SocialEdit = ({ presetValue, closeModal, showModal, updateSocial }: SocialEditPropType) => {
  const [telegram, setWebsite] = useState<InputValueType>({ value: '', isValid: false })
  const [instagram, setPhone] = useState<InputValueType>({ value: '', isValid: false })
  const [twitter, setEmail] = useState<InputValueType>({ value: '', isValid: false })

  const handleWebsiteInput = (Website: InputValueType) => {
    setWebsite(Website)
  }

  const handlePhoneInput = (Phone: InputValueType) => {
    setPhone(Phone)
  }

  const handleEmailInput = (Email: InputValueType) => {
    setEmail(Email)
  }

  const telegramRules = [
    (val: string) => validateWebsite(val) || 'Wrong telegram format',
  ]

  const instagramRules = [
    (val: string) => validateLength(val, 17) || 'Wrong instagram number',
  ]

  const twitterRules = [
    (val: string) => validateEmail(val) || 'Wrong twitter format'
  ]

  const onUpdateButtonClicked = () => {
    if(telegram.value && !telegram.isValid) return
    if(instagram.value && !instagram.isValid) return
    if(twitter.value && !twitter.isValid) return

    const social: SocialType = {telegram: telegram.value, instagram: instagram.value, twitter: twitter.value}
    updateSocial(social)
  }

  const onCancelButtonClicked = () => {
    closeModal()
  }


  return (
    <CommonModal
      toggleModal={showModal}
      title="Edit social"
      content={(
        <View style={[]}>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(instagram: InputValueType) => { handlePhoneInput(instagram) }}
              placeholder='Telegram'
              presetValue={presetValue?.instagram}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(telegram: InputValueType) => { handleWebsiteInput(telegram) }}
              placeholder='Instagram'
              presetValue={presetValue?.telegram}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(twitter: InputValueType) => { handleEmailInput(twitter) }}
              placeholder='Twitter'
              presetValue={presetValue?.twitter}
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

export default SocialEdit

const styles = StyleSheet.create({})