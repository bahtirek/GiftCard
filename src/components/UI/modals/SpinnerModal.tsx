import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type SpinnerModalProp = {
  toggleModal: boolean
}

const SpinnerModal = ({toggleModal}: SpinnerModalProp) => {


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={toggleModal}
    >
      <View style={styles.modalBackground}>
        <ActivityIndicator size={'large'} color={"#FF4416"} />
      </View>
    </Modal>
  )
}

export default SpinnerModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
})