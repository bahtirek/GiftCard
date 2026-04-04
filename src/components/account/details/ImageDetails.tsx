import { FlatList, StyleSheet, Image, View, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useAccountStore } from '@/stores/account.store';
import IconButton from '@/components/UI/buttons/IconButton';
import { updateAccountAPI } from '@/api/account/account.api';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { get } from 'node_modules/axios/index.cjs';
import ImageGalleryModal from '@/components/UI/modals/ImageGalleryModal';


const ImageDetails = () => {
  const { account, updateImages } = useAccountStore();
  const [image, setImage] = useState<string | null>(null);
  const [imageToDisplay, setImageToDisplay] = useState<string[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  

  const pickImageFromPhoneGallery = async () => {
    // Request permission (Required for iOS)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      mockImageUpload();
    }

  };

  const deleteImage = async (index: number) => {
    const newImages = account!.images.filter((_, i) => i !== index);
    await updateAccountAPI({...account!, images: newImages});
    updateImages(newImages);
  }

  const onImageDeleteButtonClicked = (index: number) => {
    if (!account?.images) return;
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Delete', onPress: () => deleteImage(index) },
    ]);
  }

  const mockImageUpload = () => {
    const newImage = getRandomPic();
    const newImages = [...(account?.images || []), newImage];
    updateAccountAPI({...account!, images: newImages});
    updateImages(newImages);
    console.log("Image uploaded successfully:", newImage);
  }

  const getRandomPic = () => {
    const number = Math.floor(Math.random() * 10);
    const randomPic = `https://picsum.photos/seed/restaurant${account?.id}_${number}/400/300`;
    if (account?.images?.includes(randomPic)) {
      return getRandomPic(); // Ensure uniqueness
    }
    return randomPic;
  }

  const showImageInModal = (image: string) => {
    setImageToDisplay([image])
    setToggleModal(true)
  }

  function handleCloseModal(): void {
    setToggleModal(false);
  }

  return (
    <View>
      <FlatList 
        data={account?.images || []}
        keyExtractor={(item) => item}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => {showImageInModal(item)}}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item}} style={{width: 100, height: 100, borderRadius: 8}} />
              <View style={styles.deleteButton}>
                <IconButton icon='trash-2' onPress={() => onImageDeleteButtonClicked(index)} />
              </View>
            </View>
            </TouchableOpacity>
        )}
        horizontal
        style={{paddingBottom: 12}}
      />
      {account?.images && account.images.length < 10 &&
        <CustomButton label='Upload Image' handlePress={pickImageFromPhoneGallery} secondary />
      }
      <ImageGalleryModal toggleModal={toggleModal} images={imageToDisplay} closeModal={handleCloseModal} />
    </View>
  )
}

export default ImageDetails

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 12,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
})

