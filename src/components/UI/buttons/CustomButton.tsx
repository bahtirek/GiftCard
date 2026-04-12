import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Font } from '@/styles/constants'

type CustomButtonType = {
  label: string, 
  containerStyles?: object,
  handlePress?: any,
  textStyles?: object, 
  isLoading?: boolean,
  secondary?: boolean 
}
const CustomButton = ({label, handlePress, containerStyles, textStyles, isLoading, secondary}: CustomButtonType) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      disabled={isLoading}
      style={[secondary ? styles.secondary : styles.primary, styles.container, containerStyles]}
    >
      <Text style={[styles.text, textStyles, secondary ? styles.secondaryText : '']}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  primary: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '100%',
  },
  secondary: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  secondaryText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: Font.md
  },
  text: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: Font.lg,
  },
})