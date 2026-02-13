import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from 'react-native'
import React from 'react'
import { ListItemType } from '@/types'
import { text } from '@/styles/styles'

const ListItem = ({
  label,
  handlePress,
  containerStyles
}: ListItemType ) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Text style={[text.lg, text.primary]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default ListItem

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  label: {

  }
});