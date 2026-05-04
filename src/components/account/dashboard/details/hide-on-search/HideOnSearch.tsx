import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAccountStore } from '@/stores/account.store';
import CustomCheckbox from '@/components/UI/forms/CustomCheckbox';
import { updateAccountAPI } from '@/api/account/account.api';
import { GiftCardType } from '@/types';
import { pb } from '@/styles/styles';

const HideOnSearch = () => {
  const { account, updateAccount } = useAccountStore();

  const handelCheckBoxSelect = async(value: boolean) => {
    const updatedAccount: GiftCardType = {...account!, hideOnSearch: value}
    await updateAccountAPI(updatedAccount)
    updateAccount(updatedAccount);

    const alertDescription = value ? 'This gift card is hidden now in search results!' : 'This gift card is visible now in search results!'

    Alert.alert('Search status', alertDescription, [
      { text: 'Ok' },
    ]);
  }

  return (
    <View style={[pb.xxl]}>
      <CustomCheckbox 
        label={'Hide from search'} 
        checked={account?.hideOnSearch || false} 
        handelCheckBoxSelect={(value: boolean) => {handelCheckBoxSelect(value)}} 
      />
    </View>
  )
}

export default HideOnSearch

const styles = StyleSheet.create({})