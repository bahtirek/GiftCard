import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import { CustomButtonType } from 'src/types'

const CustomButton = ({label, handlePress, containerStyles, textStyles, isLoading}: CustomButtonType) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text
      >{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton