import { StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { GiftCardType } from '@/types'
import { commonStyles, flex, ma, mb, mr, mt, pa, pl, pt, px, py, text } from '@/styles/styles'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from '@/navigation/navigation-types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Font } from '@/styles/constants'
import ExpoIcons from '@expo/vector-icons/Feather';
import IconButton from '../UI/buttons/IconButton'
import ImageGallery from './ImageGallery'


const Stack = createNativeStackNavigator<CartStackParamList>();
type NavigationProp = NativeStackNavigationProp<CartStackParamList, 'EditCartItem'>;

type GiftCardDetailsCompletePropType = {
  giftCard: GiftCardType
}

const GiftCardDetailsComplete = ({giftCard}: GiftCardDetailsCompletePropType) => {
  const navigation = useNavigation<NavigationProp>();

  const openImageGallery = () => {
    Alert.alert(
      "Image Gallery",
      "This feature is coming soon!",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ]
    );
  }

  const handlePress = () => {
    openImageGallery();
  }

  return (
    <View>
      <View style={[styles.container]}>
          <View style={[styles.card]}>
            <ImageGallery images={giftCard?.images} />
            <View style={[styles.descriptionContainer]}>
              <Text style={[styles.description]}>{giftCard?.description}</Text>
            </View>
          </View>
          <View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <ExpoIcons name="map" size={14} color={Colors.primary} />
                <Text style={[text.grey]}>{giftCard?.address?.line_one}, {giftCard?.address?.city}</Text>
              </View>
              <View style={styles.detailsRow}>
                <ExpoIcons name="globe" size={14} color={Colors.primary} />
                <Text style={[text.grey]}>{giftCard?.website}</Text>
              </View>
              <View style={styles.detailsRow}>
                <ExpoIcons name="phone" size={14} color={Colors.primary} />
                <Text style={[text.grey]}>{giftCard?.phone}</Text>
              </View>
            </View>
          </View>
      </View>
    </View>
  )
}

export default GiftCardDetailsComplete

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  descriptionContainer: {
    paddingLeft: 16,
    flexGrow: 1,
    width: 0,
    paddingTop: 4,
  },
  address: {
    color: Colors.secondary800,
    fontWeight: 'normal'
  },
  description: {
    color: Colors.secondary800,
    fontWeight: 'normal',
  },
  detailsContainer: {
    marginTop: 16,
    rowGap: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center'
  },
});