import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ContactType, InputValueType } from '@/types'
import CommonModal from '@/components/UI/modals/CommonModal'
import CustomInput from '@/components/UI/forms/CustomInput'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { commonStyles } from '@/styles/styles'
import { validateEmail, validateLength, validateWebsite } from '@/utils/input-validation'

type ContactsEditPropType = {
  presetValue: ContactType | undefined,
  showModal: boolean
  closeModal: () => void,
  updateContacts: (contacts: ContactType) => void,
}

const ContactsEdit = ({ presetValue, closeModal, showModal, updateContacts }: ContactsEditPropType) => {
  const [website, setWebsite] = useState<InputValueType>({ value: '', isValid: false })
  const [phone, setPhone] = useState<InputValueType>({ value: '', isValid: false })
  const [email, setEmail] = useState<InputValueType>({ value: '', isValid: false })

  const handleWebsiteInput = (Website: InputValueType) => {
    setWebsite(Website)
  }

  const handlePhoneInput = (Phone: InputValueType) => {
    setPhone(Phone)
  }

  const handleEmailInput = (Email: InputValueType) => {
    setEmail(Email)
  }

  const websiteRules = [
    (val: string) => validateWebsite(val) || 'Wrong website format',
  ]

  const phoneRules = [
    (val: string) => validateLength(val, 17) || 'Wrong phone number',
  ]

  const emailRules = [
    (val: string) => validateEmail(val) || 'Wrong email format'
  ]

  const onUpdateButtonClicked = () => {
    if(website.value && !website.isValid) return
    if(phone.value && !phone.isValid) return
    if(email.value && !email.isValid) return

    const contacts: ContactType = {website: website.value, phone: phone.value, email: email.value}
    updateContacts(contacts)
  }

  const onCancelButtonClicked = () => {
    closeModal()
  }


  return (
    <CommonModal
      toggleModal={showModal}
      title="Edit contacts"
      content={(
        <View style={[]}>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(phone: InputValueType) => { handlePhoneInput(phone) }}
              placeholder='Phone'
              presetValue={presetValue?.phone}
              keyboardType='number-pad'
              mask='phone'
              maxLength={17}
              rules={phoneRules}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(website: InputValueType) => { handleWebsiteInput(website) }}
              placeholder='Website'
              rules={websiteRules}
              maxLength={50}
              presetValue={presetValue?.website}
            />
          </View>
          <View style={[commonStyles.inputContainer]}>
            <CustomInput
              onInput={(email: InputValueType) => { handleEmailInput(email) }}
              placeholder='Email'
              rules={emailRules}
              maxLength={50}
              presetValue={presetValue?.email}
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

export default ContactsEdit

const styles = StyleSheet.create({})