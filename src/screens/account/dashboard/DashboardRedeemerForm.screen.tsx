import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles, flex, mt, pb, pt, text } from '@/styles/styles'
import CustomInput from '@/components/UI/forms/CustomInput'
import { useAccountStore } from '@/stores/account.store'
import { InputValueType, RedeemerType } from '@/types'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomButton from '@/components/UI/buttons/CustomButton'
import { validateLength } from '@/utils/input-validation'
import { postRedeemerAPI, updateRedeemerAPI } from '@/api/redeemer/redeemer.api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AccountStackParamList } from '@/navigation/navigation-types'


type Props = NativeStackScreenProps<AccountStackParamList, 'DashboardRedeemerFormScreen'>;

const DashboardRedeemerFormScreen = ({ route }: Props) => {
  const { redeemer } = route.params;
  const store = useAccountStore();
  const [firstname, setFirstName] = useState<InputValueType>({ value: '', isValid: false });
  const [lastname, setLastName] = useState<InputValueType>({ value: '', isValid: false });
  const [phone, setPhone] = useState<InputValueType>({ value: '', isValid: false });
  const [initialValueFirstName, setInitialValueFirstName] = useState('');
  const [initialValueLastName, setInitialValueLastName] = useState('');
  const [initialValuePhone, setInitialValuePhone] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Submit')
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: redeemer?.id ? 'Edit redeemer details' : 'Create redeemer'
    });
  }, [navigation, redeemer])

  useEffect(() => {    
    if(redeemer?.id){     
      setInitialValueFirstName(redeemer.firstname);
      setInitialValueLastName(redeemer.lastname);
      setInitialValuePhone(redeemer.phone);
    }
  }, [redeemer])
  
  const handleFirstNameInput = (firstname: InputValueType) => {
    setFirstName(firstname);
  }
  const handleLastNameInput = (lastname: InputValueType) => {
    setLastName(lastname);
  }
  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
  }

  const nameRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Only letters and spaces are allowed'
  ]

  const phoneRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateLength(val, 17) || 'Wrong phone number'
  ]

  const onSubmitButtonClick = async() => {
    if (!phone.isValid && !firstname.isValid && !lastname.isValid) {
      return Alert.alert('Missing data', "Please provide recipient details")
    }
    if(redeemer?.id) {
      updateRedeemer()
    } else {
      postRedeemer()
    }
  }

  const postRedeemer = async() => {
    const redeemers = store.getRedeemers()
    const lastRedeemerId = redeemers.length > 0 ? redeemers[redeemers.length - 1].id : 1;
    
    const redeemer: RedeemerType = {
      id: lastRedeemerId+1,
      phone: phone.value,
      lastname: lastname.value,
      firstname: firstname.value
    }
    
    await postRedeemerAPI(redeemer);
    navigation.goBack();
  }

  const updateRedeemer = async() => {
    const updatedRedeemer: RedeemerType = {
      id: redeemer!.id,
      phone: phone.value,
      lastname: lastname.value,
      firstname: firstname.value
    }
    await updateRedeemerAPI(updatedRedeemer);
    navigation.goBack();
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow]}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={[text.md, text.grey, pb.md]}>Verify phone number:</Text>
        <CustomInput
          onInput={(phone: InputValueType) => { handlePhoneInput(phone) }}
          placeholder='Phone'
          mask='phone'
          maxLength={17}
          keyboardType='number-pad'
          rules={phoneRules}
          presetValue={initialValuePhone}
        />
        </View>
        <View style={styles.inputContainer}>
        <Text style={[text.md, text.grey, pb.md, mt.md]}>Your name:</Text>
        <View style={{marginBottom: 24, marginTop: 4}}>
          <CustomInput 
            onInput={(firstname: InputValueType) => {handleFirstNameInput(firstname)}} 
            placeholder='First name'
            mask='maskName'
            rules={nameRules}
            maxLength={30}
            presetValue={initialValueFirstName}
          />
        </View>
        <View style={{marginBottom: 24, marginTop: 4}}>
          <CustomInput 
            onInput={(lastname: InputValueType) => {handleLastNameInput(lastname)}} 
            placeholder='Last name'
            mask='maskName'
            rules={nameRules}
            maxLength={30}
            presetValue={initialValueLastName}
          />
        </View>
        </View>
        <View style={[commonStyles.buttonContainer]}>
          <CustomButton label={buttonLabel} handlePress={onSubmitButtonClick} />
        </View>
    </View>

    </SafeAreaView>
  )
}

export default DashboardRedeemerFormScreen

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