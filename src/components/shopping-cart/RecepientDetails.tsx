import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { flex, pr, pt, text } from '@/styles/styles';

type RecepientDetailsProps = {
  label: string;
  description: string;
}

const RecepientDetails = ({ label, description }: RecepientDetailsProps) => {
  return (
    <View style={[flex.alignStart, pt.sm, flex.row]}>
      <Text style={[text.sm, text.grey, styles.label]}>{label}</Text>
      <Text style={[text.sm, text.grey, styles.bigText]}>{description}</Text>
    </View>
  )
}

export default RecepientDetails;

const styles = StyleSheet.create({
  label: {
    width: 90
  },
  bigText: {
    flexGrow: 1,
    width: 0
  }
})