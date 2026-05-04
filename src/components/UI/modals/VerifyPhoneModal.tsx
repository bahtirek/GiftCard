import { Modal, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VerifyPhone from '@/components/account/verify-phone/VerifyPhone'
import VerifyPin from '@/components/account/verify-phone/VerifyPin'
import { profileStorage } from '@/storage-services/profile.storage';

type VerifyPhoneModalProp = {
  toggleModal: boolean,
  showPinOnly?: boolean,
  onModalClose: () => void
}

const VerifyPhoneModal = ({ toggleModal, onModalClose, showPinOnly = false }: VerifyPhoneModalProp) => {
  const [showVerifyPhone, setShowVerifyPhone] = useState(false)

  useEffect(() => {
    setShowVerifyPhone(!showPinOnly);
  }, [toggleModal, showPinOnly])

  const onPhoneVerify = async (phone: string) => {
    setShowVerifyPhone(false);
  }

  const onPinVerify = async (pin: string) => {
    await profileStorage.savePhoneConfirmationTime(Date.now());
    onModalClose();
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
        <View style={[styles.modalContent]}>
          <View>
            {showVerifyPhone ?
              (
                <VerifyPhone onPhoneVerify={onPhoneVerify} onCancel={onCancel} />
              ) : (
                <VerifyPin onPinVerify={onPinVerify} onCancel={onModalClose} showPinOnly={showPinOnly} />
              )
            }
          </View>
        </View>
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
