import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode } from 'react';

const SafeView = ( children: ReactNode ) => {
  return (
    <SafeAreaView edges={["left", "right"]}>
      {children}
    </SafeAreaView>
  )
}

export default SafeView

const styles = StyleSheet.create({
  safeViewContainer: {
    height: '100%',
    paddingTop: 40
  }
})