import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RedeemerType } from '@/types'

type RedeemerDetailsProp = {
  redeemer: RedeemerType
}

const RedeemerDetails = ({redeemer}: RedeemerDetailsProp) => {
  return (
    <View>
      <Text>{redeemer.firstname}</Text>
      <Text>{redeemer.lastname}</Text>
      <Text>{redeemer.phone}</Text>
    </View>
  )
}

export default RedeemerDetails

const styles = StyleSheet.create({})