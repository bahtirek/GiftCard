import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageCarousel from '@/components/common/ImageCarousel'
import IconButton from '../buttons/IconButton'

type ImageModalProp = {
  closeModal: () => void,
  toggleModal: boolean,
  images: string[]
}
const ImageGalleryModal = ({ toggleModal, images, closeModal }: ImageModalProp) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={toggleModal}
    >
      <View style={styles.modalBackground} >
        <View style={[styles.modalContent]}>
          <View style={{alignSelf: 'flex-end'}}>
            <IconButton icon={'x'} onPress={closeModal} />
          </View>
          <ImageCarousel images={images} />
        </View>
      </View>
    </Modal>
  )
}

export default ImageGalleryModal

const styles = StyleSheet.create({
    modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingBottom: 64,
    paddingHorizontal: 16
  },
  modalContent: {
    width: '100%',
    flexDirection: 'column'
  },
})