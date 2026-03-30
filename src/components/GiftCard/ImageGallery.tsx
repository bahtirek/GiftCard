import { Alert, StyleSheet, Image, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/styles/constants'
import ImageGalleryModal from '../UI/modals/ImageGalleryModal'

type ImageGalleryPropType = {
  images: string[]
}

const ImageGallery = ({ images }: ImageGalleryPropType) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handlePress = () => {
    setToggleModal(true);
  }

  function handleCloseModal(): void {
    setToggleModal(false);
  }
  
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <View style={[styles.imageWrapper]}>
          { images && images[0] && (
            <View style={[styles.imageContainer, styles.shadow, {bottom: 0, left: 0, zIndex: 10}]}>
                <Image 
                  source={{uri: images[0]}}
                  style={[styles.image]}
                  resizeMode='cover'
                />
            </View>
          )}
          { images && images[1] && (
            <View style={[styles.imageContainer, styles.shadow, {bottom: 10, left: 10, zIndex: 5}]}>
                <Image 
                  source={{uri: images[1]}}
                  style={[styles.image]}
                  resizeMode='cover'
                />
            </View>
          )}
          { images && images[2] && (
            <View style={[styles.imageContainer, styles.shadow, {top: 0, right: 0, zIndex: 0}]}>
                <Image 
                  source={{uri: images[2]}}
                  style={[styles.image]}
                  resizeMode='cover'
                />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <ImageGalleryModal toggleModal={toggleModal} images={images} closeModal={handleCloseModal} />
    </View>
  )
}

export default ImageGallery

const styles = StyleSheet.create({
  imageWrapper: {
    width: 90,
    height: 90,
    flexBasis: 90,
    position: 'relative',
  },
  imageContainer: {
    width: 70,
    height: 70,
    flexBasis: 70,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  image: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  shadow: {
    shadowRadius: 16,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: "rgba(102, 102, 102, 0.5)",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
        shadowColor: "rgba(0, 0, 0, 0.84)",
        shadowOpacity: 1,
      }
    })
  },
});