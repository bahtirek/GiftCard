import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'

type CommonModalProp = {
  toggleModal: boolean,
  title: string,
  content: React.ReactNode,
  action: React.ReactNode
}

const CommonModal = ({toggleModal, title, content, action}: CommonModalProp) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={toggleModal}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContent]}>
          <ScrollView style={{}}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View>
              {content}
            </View>
            <View style={styles.actionContainer}>
              {action}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default CommonModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingBottom: 64,
    paddingHorizontal: 16
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