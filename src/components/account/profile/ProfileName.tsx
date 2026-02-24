import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '@/components/UI/forms/CustomInput'
import { mt, pb, text } from '@/styles/styles'
import { InputValueType } from '@/types'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { useProfileStore } from '@/stores/profile.store'
import { updateProfile } from '@/api/profile/verify-profile.api'
import { profileStorage } from '@/services/profile.storage'
import { useIsFocused } from '@react-navigation/native'

type ProfileNameProp = {
  onSkipOrUpdate: () => void,
  isEditing?: boolean
}

const ProfileName = ({onSkipOrUpdate, isEditing}: ProfileNameProp) => {
  const getProfile = useProfileStore(state => state.getProfile);
  const updateProfileStore = useProfileStore(state => state.updateProfile);
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);
  const [firstName, setFirstName] = useState<InputValueType>({ value: '', isValid: false });
  const [lastName, setLastName] = useState<InputValueType>({ value: '', isValid: false });
  const [initialValueFirstName, setInitialValueFirstName] = useState('');
  const [initialValueLastName, setInitialValueLastName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {    
    if(isEditing){
      const profileData = getProfile();
      
      if(profileData?.firstName) {
        setInitialValueFirstName(profileData.firstName);
      }
      if(profileData?.lastName) {
        setInitialValueLastName(profileData.lastName);
      }
    }
  }, [isFocused])

  const handleFirstNameInput = (firstName: InputValueType) => {
    setFirstName(firstName);
  }
  const handleLastNameInput = (lastName: InputValueType) => {
    setLastName(lastName);
  }

  const nameRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Only letters and spaces are allowed'
  ]

  const onSubmitButtonClick = () => {
    if (!firstName.value && !lastName.value) {
      return Alert.alert('Missing data', "Please provide recipient details")
    }
    if(!isFirstNameTouched && firstName.value) {
      setIsFirstNameTouched(true);
    }
    if(!isLastNameTouched && lastName.value) {
      setIsLastNameTouched(true);
    }
    saveName();
  }
  
  const saveName = async() => {
    const profile = getProfile();
    if(firstName.value === profile.firstName && lastName.value === profile.lastName) {
      onSkipOrUpdate();
      return;
    }
    if(firstName.value) profile.firstName = firstName.value.trim();
    if(lastName.value) profile.lastName = lastName.value.trim();
    await updateProfile(profile);
    updateProfileStore({...profile, nameUpdatedSkiped: true});
    profileStorage.saveProfile(profile);
    onSkipOrUpdate();
  }

  const onSkipButtonClick = () => {
    const profile = getProfile();
    updateProfileStore({...profile, nameUpdatedSkiped: true});
    onSkipOrUpdate();
  }
  
  const onCancelButtonClick = () => {
    onSkipOrUpdate();
  }

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={[text.md, text.grey, pb.md, mt.md]}>Your name:</Text>
        <View style={{marginBottom: 24, marginTop: 4}}>
          <CustomInput 
            onInput={(firstName: InputValueType) => {handleFirstNameInput(firstName)}} 
            placeholder='First name'
            mask='maskName'
            rules={nameRules}
            maxLength={30}
            isTouched={isFirstNameTouched}
            presetValue={initialValueFirstName}
          />
        </View>
        <View style={{marginBottom: 24, marginTop: 4}}>
          <CustomInput 
            onInput={(lastName: InputValueType) => {handleLastNameInput(lastName)}} 
            placeholder='Last name'
            mask='maskName'
            rules={nameRules}
            maxLength={30}
            isTouched={isLastNameTouched}
            presetValue={initialValueLastName}
          />
        </View>
        </View>
        <View style={{ marginTop: 'auto', paddingTop: 38, paddingBottom: 8 }}>
          <CustomButton label={'Submit'} handlePress={onSubmitButtonClick} />
          {!isEditing && <CustomButton label={'Skip'} handlePress={onSkipButtonClick} containerStyles={styles.skipButton} secondary />}
          {isEditing && <CustomButton label={'Cancel'} handlePress={onCancelButtonClick} containerStyles={styles.skipButton} secondary />}
        </View>
    </View>
  )
}

export default ProfileName

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
  skipButton: {
    marginTop: 16,
    width: '100%',
  },
})