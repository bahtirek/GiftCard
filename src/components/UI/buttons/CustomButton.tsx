import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from 'react-native'
import React from 'react'
import { CustomButtonType } from 'src/types'
import { Colors, Font } from '@/styles/constants'

const CustomButton = ({label, handlePress, containerStyles, textStyles, isLoading}: CustomButtonType) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      disabled={isLoading}
      style={[styles.container]}
    >
      <Text style={[styles.text]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    borderColor: Colors.primary,
    borderWidth: 1,
    width: '100%',
  },
  text: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: Font.xl,
  },
})