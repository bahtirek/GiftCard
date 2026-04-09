import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { mb, text } from '@/styles/styles';
import { updateAccountAPI } from '@/api/account/account.api';
import { AddressType } from '@/types';
import AddressEdit from './AddressEdit';

const AddressDetails = () => {
  const { account, updateAccount } = useAccountStore();
  const [showAddressEditModal, setShowAddressEditModal] = useState(false)

  const onAddressEditButtonClicked = () => {
    setShowAddressEditModal(true)
  }

  const updateAddress = async (address: AddressType) => {
    const updatedAccount = {...account!, address: address}
    await updateAccountAPI(updatedAccount)
    updateAccount(updatedAccount);
    setShowAddressEditModal(false)
  }

  return (
    <View>
      <Text style={[text.xs, text.primaryLight, mb.xs]}>Address:</Text>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          <Text style={[mb.xs]}>{account?.address?.line_one}</Text>
          {account?.address?.line_two && <Text style={[mb.xs]}>{account?.address?.line_two}</Text>}
          <Text style={[mb.xs]}>{account?.address?.city} {account?.address?.zip}</Text>
          <Text style={[mb.xs]}></Text>
        </View>
        <IconButton icon='edit' onPress={() => onAddressEditButtonClicked()} />
      </View>
      <AddressEdit 
        showModal={showAddressEditModal} 
        closeModal={()=>{setShowAddressEditModal(false)}} 
        presetValue={account?.address}
        updateAddress={updateAddress}
      />
    </View>
  )
}

export default AddressDetails

const styles = StyleSheet.create({
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 16
  },
  details: {
    flexGrow: 1,
    width: 0,
    paddingRight: 16
  },
})