import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import Checkbox from 'expo-checkbox';
import { Colors } from '@/styles/constants';

const CategoryCheckbox = ( { item, handelCheckBoxSelect}: any) => {
  const [isChecked, setChecked] = useState(item.checked);

  const setValue = (value: boolean) => {
    handelCheckBoxSelect(value);
    setChecked(!isChecked);   
  }
  
  return (
    <View style={styles.container}>
      <Checkbox
        value={isChecked}
        onValueChange={setValue}
        color={Colors.primary500}
        style={styles.checkbox}
      />
      <Pressable onPress={() => { setValue(!isChecked) }}>
        <Text style={styles.label}>{item.label}</Text>
      </Pressable>
    </View>
  )
}

export default CategoryCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  label: {
    color: '#4A4A4A',
    fontSize: 16,
  },
})