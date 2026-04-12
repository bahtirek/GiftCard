import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RedeemerType } from '@/types'
import { flex, mb, text } from '@/styles/styles'
import IconButton from '@/components/UI/buttons/IconButton'
import { deleteRedeemerAPI } from '@/api/redeemer/redeemer.api'

type RedeemerDetailsProp = {
  redeemer: RedeemerType,
  onRedeemerDeleted: () => void
}

const RedeemerDetails = ({redeemer, onRedeemerDeleted}: RedeemerDetailsProp) => {
  const onEditButtonClicked = () => {

  }

  const onDeleteButtonClicked = async() => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      { text: 'Delete', onPress: () => deleteRedeemer() },
    ]);
  }
  
  const deleteRedeemer = async() => {
    await deleteRedeemerAPI(redeemer.id)
    onRedeemerDeleted()
  }

  return (
    <View>
      <View style={styles.detailsRow}>
        <View style={[styles.details]}>
          <Text style={[text.xs, text.primaryLight, mb.xs]}>Name:</Text>
          <Text style={[mb.sm]}>{redeemer.firstname} {redeemer.lastname}</Text>
          <Text style={[text.xs, text.primaryLight, mb.xs]}>Phone:</Text>
          <Text style={[mb.sm]}>{redeemer.phone}</Text>
        </View>
        <View style={[flex.justifyAround]}>
          <IconButton icon='edit' onPress={() => onEditButtonClicked()} />
          <IconButton icon='trash-2' onPress={() => onDeleteButtonClicked()} />
        </View>
      </View>
    </View>
  )
}

export default RedeemerDetails

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