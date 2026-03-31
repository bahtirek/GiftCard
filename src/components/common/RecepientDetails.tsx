import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CartItemType, InputValueType } from '@/types';
import { validateEmail, validateLength } from '@/utils/input-validation';
import CustomInput from '@/components/UI/forms/CustomInput';
import { mb, pb, text } from '@/styles/styles';
import * as Contacts from 'expo-contacts';
import ContactsIconButton from '../UI/buttons/ContactsIconButton';

type RecepientDetailsProps = {
  handleRecipientDetailsChange: (recepientDetails: RecepientDetailsType) => void;
  cartItemToEdit?: CartItemType;
  isPhoneInputTouched: boolean;
  isEmailInputTouched: boolean;
}

type RecepientDetailsType = {
  email?: InputValueType;
  phone?: InputValueType;
  note?: InputValueType;
}

const RecepientDetails = ({ handleRecipientDetailsChange, cartItemToEdit, isPhoneInputTouched, isEmailInputTouched }: RecepientDetailsProps) => {
  const [email, setEmail] = useState<InputValueType>({value: '', isValid: false});
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: false});
  const [note, setNote] = useState<InputValueType>({value: '', isValid: true});
  const [presetValue, setPresetValue] = useState<InputValueType>({value: '', isValid: false});
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  useEffect(() => {
    resetForm();
    getPermissions();
    if (cartItemToEdit && cartItemToEdit.id) {
      setPresetValue({ value: cartItemToEdit.phone!, isValid: true });
    }
  }, [cartItemToEdit])

  useEffect(() => {
    getPermissions();
  }, [])

  const getPermissions = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setPermissionStatus(status);
  }

  const handleEmailInput = (email: InputValueType) => {
    setEmail(email);
    handleRecipientDetailsChange({ email })
  }

  const handleNoteInput = (note: InputValueType) => {
    setNote(note)
    handleRecipientDetailsChange({ note })
  }

  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
    handleRecipientDetailsChange({ phone })
  }

  const resetForm =() => {
    setEmail({isValid: false, value: ''});
    setPhone({isValid: false, value: ''});
    setNote({isValid: true, value: ''});
  }

  const phoneRules = [
    (val: string) => validateLength(val, 12) || 'Wrong phone number'
  ]

  const emailRules = [
    (val: string) => validateEmail(val) || 'Wrong email format'
  ]

  const openContacts = async () => {
    if (permissionStatus === 'granted') {
      const contact = await Contacts.presentContactPickerAsync();
      if (contact && contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        const selectedPhone = contact.phoneNumbers[0].number;
        const formattedPhone = selectedPhone!.replace(/\D/g, '');
        setPresetValue({ value: formattedPhone, isValid: true });
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[text.md, text.grey, pb.md]}>Recepient details:</Text>
        <View style={styles.phoneInputContainer}>
          <CustomInput
            onInput={(phone: InputValueType) => { handlePhoneInput(phone) }}
            placeholder='Phone'
            mask='phone' 
            maxLength={12}
            keyboardType='number-pad'
            presetValue={presetValue.value}
            rules={phoneRules}
            className='pl-14'
            isTouched={isPhoneInputTouched}
          />
          <View style={styles.contactButtonContainer}>
            <ContactsIconButton onPress={openContacts} />
          </View>
        </View>
        <Text style={[text.md, text.grey, pb.md]}>Or</Text>
        <View style={[mb.xl]}>
          <CustomInput 
            onInput={(email: InputValueType) => {handleEmailInput(email)}} 
            placeholder='Email'
            keyboardType='email-address'
            presetValue={cartItemToEdit?.email}
            rules={emailRules}
            isTouched={isEmailInputTouched}
          />
        </View>
        <Text style={[text.md, text.grey, pb.md]}>Gift note:</Text>
        <View>
          <CustomInput 
            onInput={(note: InputValueType) => {handleNoteInput(note)}} 
            placeholder='Best wishes'
            multiline={true}
            numberOfLines={10}
            presetValue={cartItemToEdit?.note}
            textarea={true}
          />
        </View>
      </View>
    </View>
  )
}

export default RecepientDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  contactButtonContainer: {
    position: 'absolute',
    right: 8,
    top: 10,
  }
})