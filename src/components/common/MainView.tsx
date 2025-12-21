import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react';

interface MainViewProps {
  children: ReactNode
}

const MainView = ({children}: {children: ReactNode}) => {
  return (
    <View style={styles.conatiner}>
      {children}
    </View>
  )
}

export default MainView

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white'
  }
})