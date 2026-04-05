import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { mb, text } from '@/styles/styles';
import CardNameEdit from './CardNameEdit';
import { updateAccountAPI } from '@/api/account/account.api';
import DescriptionEdit from './DescriptionEdit';

const DescriptionDetails = () => {
  const { account, updateAccount } = useAccountStore();
  const [showNameEditModal, setShowNameEditModal] = useState(false)
  const [showDescriptionEditModal, setShowDescriptionEditModal] = useState(false)

  const onNameEditButtonClicked = () => {
    setShowNameEditModal(true)
  }

  const updateName = async (name: string) => {
    const updatedAccount = {...account!, name: name}
    await updateAccountAPI(updatedAccount)
    updateAccount(updatedAccount);
    setShowNameEditModal(false)
  }
  const onDescriptionEditButtonClicked = () => {
    setShowDescriptionEditModal(true)
  }

  const updateDescription = async (description: string) => {
    const updatedAccount = {...account!, description: description}
    await updateAccountAPI(updatedAccount)
    updateAccount(updatedAccount);
    setShowDescriptionEditModal(false)
  }

  return (
    <View>
      <Text style={[text.xs, text.primaryLight, mb.xs]}>Name:</Text>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          <Text>{account?.name}</Text>
        </View>
        <IconButton icon='edit' onPress={() => onNameEditButtonClicked()} />
      </View>
      <CardNameEdit 
        showModal={showNameEditModal} 
        closeModal={()=>{setShowNameEditModal(false)}} 
        presetValue={account?.name}
        updateName={updateName}
      />
      <Text style={[text.xs, text.primaryLight, mb.xs]}>Description:</Text>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          <Text>{account?.description}</Text>
        </View>
        <IconButton icon='edit' onPress={() => onDescriptionEditButtonClicked()} />
      </View>
      <DescriptionEdit 
        showModal={showDescriptionEditModal} 
        closeModal={()=>{setShowDescriptionEditModal(false)}} 
        presetValue={account?.description}
        updateDescription={updateDescription}
      />
    </View>
  )
}

export default DescriptionDetails

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
  },
})