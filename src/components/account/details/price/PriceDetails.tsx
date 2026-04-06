import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { mb, text } from '@/styles/styles';
import { updateAccountAPI } from '@/api/account/account.api';
import { PriceType } from '@/types';
import PriceEdit from './PriceEdit';

const PriceDetails = () => {
  const { account, updateAccount } = useAccountStore();
  const [showPriceEditModal, setShowPriceEditModal] = useState(false)

  const onPriceEditButtonClicked = () => {
    setShowPriceEditModal(true)
  }

  const updatePrice = async (prices: PriceType[]) => {
    const updatedAccount = {...account!, priceSet: prices}
    await updateAccountAPI(updatedAccount)
    updateAccount(updatedAccount);
    setShowPriceEditModal(false)
  }

  return (
    <View>
      <Text style={[text.xs, text.primaryLight, mb.xs]}>Price set:</Text>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          {account?.priceSet?.map((item) => (
            <Text key={item.amount} style={[mb.xs]}>{item.amount}</Text>
          ))}
        </View>
        <IconButton icon='edit' onPress={() => onPriceEditButtonClicked()} />
      </View>
      <PriceEdit 
        showModal={showPriceEditModal} 
        closeModal={()=>{setShowPriceEditModal(false)}} 
        presetValue={account?.priceSet || []}
        updatePrice={updatePrice}
      />
    </View>
  )
}

export default PriceDetails

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