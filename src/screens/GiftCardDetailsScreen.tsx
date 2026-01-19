import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/UI/CustomButton';
import { useGiftCardsStore } from '@/stores/giftCard.store';
import { GiftCardType, GiftCardsStoreState } from '@/types';
import { useNavigation, Link } from '@react-navigation/native';
import OpenURLButton from '@/components/UI/OpenURLButton';

const CardDetailsScreen = () => {
  const giftCard = useGiftCardsStore(state => state.giftCard);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: giftCard?.label
    });
  }, [navigation, giftCard])

  const handlePurchase = () => {
    console.log('Purchase gift card:', giftCard?.id);
    // Here you can add the logic to handle the purchase process
  }

  return (
    <SafeAreaView edges={["left", "right"]}>
        <View >
          <View >
            <View 
              style={[styles.image, styles.shadow]}
            >
              <Image
                source={{uri: giftCard?.thumbnail}}
                resizeMode='cover'
              />
            </View>
            <View>
              <View>
                <Text>{giftCard?.description}</Text>
                <Text>{giftCard?.address}</Text>
                <OpenURLButton url={`https://${giftCard?.website}`} title={giftCard?.website ?? ''} />
                <OpenURLButton url={`tel:${giftCard?.phone}`} title={giftCard?.phone ?? ''} />
              </View>
              
              <View>
                <CustomButton label='Purchase' handlePress={()=>{handlePurchase()}} />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default CardDetailsScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1.15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
})