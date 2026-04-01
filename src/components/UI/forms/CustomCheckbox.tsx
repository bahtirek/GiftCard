import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import Checkbox from 'expo-checkbox';
import { Colors } from '@/styles/constants';



type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  handelCheckBoxSelect: (value: boolean) => void;
}
const CustomCheckbox = ( { label, checked, handelCheckBoxSelect}: CustomCheckboxProps) => {
  const [isChecked, setChecked] = useState(checked);

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
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  )
}

export default CustomCheckbox;

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