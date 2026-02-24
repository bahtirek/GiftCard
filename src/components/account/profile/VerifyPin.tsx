import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/UI/forms/CustomInput'
import { InputValueType, ProfileType } from '@/types'
import { mt, pb, pr, text } from '@/styles/styles'
import { validateLength } from '@/utils/input-validation'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { updateProfile, verifyPinByPhone } from '@/api/profile/verify-profile.api'
import { useProfileStore } from '@/stores/profile.store'
import { profileStorage } from '@/services/profile.storage'

type VerifyPinProp = {
  onProfileCoifirmed: () => void
}

const VerifyPin = ({onProfileCoifirmed}: VerifyPinProp) => {
  const [isPinInputTouched, setIsPinInputTouched] = useState(false);
  const getProfile = useProfileStore(state => state.getProfile);
  const updateProfileStore = useProfileStore(state => state.updateProfile);

  const [pin, setPin] = useState<InputValueType>({ value: '', isValid: false });

  const handlePinInput = (pin: InputValueType) => {
    setPin(pin)
  }
  const isFormCompleted = () => {

    if (!pin.value) {
      return Alert.alert('Missing data', "Please provide recepient details")
    }
  }

  const pinRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateLength(val, 6) || 'Pin must be 6 digits long'
  ]

  const onVerifyButtonClick = async() => {
    isFormCompleted();
    if(!isPinInputTouched && pin.value) {
      setIsPinInputTouched(true);
    }
    if(!pin.isValid) return;
    verifyPin();
  }

  const verifyPin = async() => {
    const profile = getProfile();
    if(!profile || !profile.tempPhone) return;
    const profileData = await verifyPinByPhone(profile.tempPhone);
    
    if(profileData && profileData.profile.pin) {
      if(profileData.profile.pin == pin.value) {
        const updatedProfile: ProfileType = {...profileData.profile, phone: profileData.profile.tempPhone, isRegistered: true, timestamp: undefined, tempPhone: undefined}
        await updateProfile(updatedProfile);
        updateProfileStore(updatedProfile);
        profileStorage.saveProfile(updatedProfile);
        onProfileCoifirmed();
      } else {
        return Alert.alert('Wrong pin!', "The pin you entered is incorrect, please try again")
      }
    } else {
      return Alert.alert('Sorry!', "Something went wrong while verifying your pin, please try again later")
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={[text.md, text.grey, pb.md, mt.md]}>Verify pin number:</Text>
        <CustomInput
          onInput={(pin: InputValueType) => { handlePinInput(pin) }}
          placeholder='Pin'
          mask='pin'
          maxLength={12}
          keyboardType='number-pad'
          rules={pinRules}
          isTouched={isPinInputTouched}
        />
        </View>
        <View style={{ marginTop: 'auto', paddingTop: 38, paddingBottom: 8 }}>
          <CustomButton label={'Verify'} handlePress={onVerifyButtonClick} />
        </View>
    </View>
  )
}

export default VerifyPin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
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