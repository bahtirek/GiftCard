import { View, Text, StyleSheet, Platform, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/UI/buttons/CustomButton';

const Refund = ({ lastTransactionDetails, onRefundCompleted }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onRefundConfirmation = () => {
    setShowConfirmationModal(false)
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      setShowSuccessModal(true)
      //setShowErrorModal(true)
    }, 2000);
  }

  const refunded = () => {
    onRefundCompleted(true)
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Last transaction:</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{lastTransactionDetails?.amount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{lastTransactionDetails?.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Refunded by:</Text>
          <Text style={styles.value}>{lastTransactionDetails?.redeemer}</Text>
        </View>

        <View style={styles.backButtonWrapper}>
          <CustomButton
            label="Back to redeem"
            handlePress={() => onRefundCompleted(false)}
          />
        </View>

        <TouchableOpacity onPress={() => setShowConfirmationModal(true)}>
          <Text style={styles.refundText}>Refund</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Modal */}
      <Modal animationType="fade" transparent visible={showModal}>
        <View style={styles.modalOverlay}>
          <ActivityIndicator size="large" color="#FF4416" />
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal animationType="fade" transparent visible={showSuccessModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, styles.shadow]}>
            <Text style={styles.successTitle}>Refunded!</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Refunded:</Text>
              <Text style={styles.value}>100 000</Text>
            </View>

            <View style={styles.rowLargeMargin}>
              <Text style={styles.label}>New balance:</Text>
              <Text style={styles.value}>1 000 000</Text>
            </View>

            <CustomButton label="OK" handlePress={refunded} />
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal animationType="fade" transparent visible={showErrorModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, styles.shadow]}>
            <Text style={styles.errorTitle}>Oops!</Text>

            <View style={styles.rowLargeMargin}>
              <Text style={styles.label}>Couldn't refund.</Text>
            </View>

            <CustomButton
              label="Ok"
              handlePress={() => setShowErrorModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal animationType="fade" transparent visible={showConfirmationModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, styles.shadow]}>
            <Text style={styles.successTitle}>Confirm refund</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Amount to refund:</Text>
              <Text style={styles.value}>100 000</Text>
            </View>

            <View style={styles.confirmButtonWrapper}>
              <CustomButton
                label="Refund"
                handlePress={onRefundConfirmation}
              />
            </View>

            <TouchableOpacity
              onPress={() => setShowConfirmationModal(false)}
            >
              <Text style={styles.refundText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
        ...Platform.select({
      ios: {
        paddingTop: 50
      }
    })
  },

  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 18,
    color: '#1F2937', // secondary-800
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  rowLargeMargin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },

  label: {
    fontSize: 18,
    color: '#4B5563', // secondary-600
    fontFamily: 'Poppins-Regular',
  },

  value: {
    fontSize: 18,
    color: '#111827', // secondary-900
    fontFamily: 'Poppins-Regular',
  },

  backButtonWrapper: {
    marginVertical: 24,
    marginTop: 'auto',
  },

  refundText: {
    fontSize: 18,
    color: '#F97316', // primary-700 (adjust if needed)
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingBottom: 64,
  },

  modalCard: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  successTitle: {
    fontSize: 20,
    color: '#F97316', // primary-700
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },

  errorTitle: {
    fontSize: 20,
    color: '#F97316',
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },

  confirmButtonWrapper: {
    marginBottom: 24,
    marginTop: 32,
  },

  // keep your existing shadow style
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})


const styles2 = StyleSheet.create({
  container: {

  },
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  },
  phonePrefix: {
    paddingLeft: 30
  },
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
})

export default Refund;
