import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const RadioButton = ({className, label, status, onSelect}: any) => {
  const changeValue = () => {
    onSelect();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={changeValue}
      style={[styles.container, className]}
    >
      <View style={[styles.button]}>
        {status && <View style={styles.indicator} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FCAF58',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#FCAF58',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: '#4A4A4A',
  },
  indicator: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#FCAF58',
  },
})