import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { GiftCardType } from '@/types'
import { commonStyles, flex, mb, mr, mt, pa, pl, pt, px, py, text } from '@/styles/styles'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from '@/navigation/navigation-types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Font } from '@/styles/constants'


const Stack = createNativeStackNavigator<CartStackParamList>();
type NavigationProp = NativeStackNavigationProp<CartStackParamList, 'EditCartItem'>;

type GiftCardDetailsCompletePropType = {
  giftCard: GiftCardType
}

const GiftCardDetailsComplete = ({giftCard}: GiftCardDetailsCompletePropType) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <View style={[styles.container]}>
          <View style={[styles.card]}>
            <View style={[styles.imageContainer, commonStyles.shadow]}>
              { giftCard?.images &&
                <Image 
                  source={{uri: giftCard?.images[0]}}
                  style={[styles.image]}
                  resizeMode='cover'
                />
              }
            </View>
            <View style={[styles.descriptionContainer]}>
              <Text style={[styles.description]}>{giftCard?.description}</Text>
            </View>
          </View>
          <View>
            <View style={styles.detailsContainer}>
              <Text style={[text.grey]}>{giftCard?.address?.line_one}</Text>
              <Text style={[text.grey]}>{giftCard?.address?.city}</Text>
              <Text style={[text.grey]}>{giftCard?.website}</Text>
              <Text style={[text.grey]}>{giftCard?.phone}</Text>
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
  imageContainer: {
    width: 88,
    height: 88,
    flexBasis: 88,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden'
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
    marginTop: 12,
    rowGap: 8,
  }
});