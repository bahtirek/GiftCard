import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VerifyPhone from '@/components/account/verify-phone/VerifyPhone'
import VerifyPin from '@/components/account/verify-phone/VerifyPin'

type VerifyPhoneModalProp = {
  toggleModal: boolean,
  onModalClose: () => void
}

const VerifyPhoneModal = ({ toggleModal, onModalClose }: VerifyPhoneModalProp) => {
  const [showSpinner, setShowSpinner] = useState(false)
  const [showVerifyPin, setShowVerifyPin] = useState(false)
  const [showVerifyPhone, setShowVerifyPhone] = useState(true)
  const [modalTitle, setModalTitle] = useState('Verify phone')

  useEffect(() => {
    setShowVerifyPin(false)
    setShowVerifyPhone(toggleModal)
    setModalTitle('Verify phone')
  }, [toggleModal])

  const onPhoneVerify = async (phone: string) => {
    setShowVerifyPhone(false);
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      setShowVerifyPin(true);
      setModalTitle('Verify pin')
    }, 2000)
  }

  const onPinVerify = async (pin: string) => {
    setShowSpinner(true);
    setShowVerifyPin(false);
    setTimeout(() => {
      
      onModalClose();
      setShowSpinner(false);
    }, 2000)
  }

  const onCancel = () => {
    onModalClose();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={toggleModal}
    >
      <View style={styles.modalBackground}>
        {showSpinner ? (
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        ) : (
          <>
            {toggleModal && 
              <View style={[styles.modalContent]}>
                <ScrollView style={{}}>
                  <Text style={styles.modalTitle}>{modalTitle}</Text>
                  <View>
                    {showVerifyPhone && <VerifyPhone onPhoneVerify={onPhoneVerify} onCancel={onCancel}/>}
                    {showVerifyPin && <VerifyPin onPinVerify={onPinVerify} onCancel={onModalClose}/>}
                  </View>
                </ScrollView>
              </View>
            }
          </>
        )}
      </View>
    </Modal>
  )
}

export default VerifyPhoneModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 32
  },
  modalContent: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
    minHeight: 200,
    flexDirection: 'column',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FF4416',
    marginBottom: 24,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
  actionContainer: {
    marginTop: 'auto',
    paddingTop: 24,
  },
})
