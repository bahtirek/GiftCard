import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ExpoIcons from '@expo/vector-icons/Feather';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.container}>
      <ExpoIcons name="chevron-left" size={32} color="#FCAF58" />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -18,
  },
  text: {
    fontSize: 18,
    color: '#FCAF58',
  }
})