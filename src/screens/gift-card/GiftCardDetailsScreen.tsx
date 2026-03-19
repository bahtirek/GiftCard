import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useNavigation, Link } from '@react-navigation/native';
import {commonStyles, pb, text} from '@/styles/styles';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { GiftCardsStackParamList, MainTabParamList } from '@/navigation/navigation-types';
import { fetchGiftCardById } from '@/api/gift-cards/search.api';
import { GiftCardType } from '@/types';
import ImageCarousel from '@/components/common/ImageCarousel';

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'GiftCardDetails'>;
type NavigationProp = NativeStackNavigationProp<MainTabParamList, 'GiftCardsNavigation'>;

const CardDetailsScreen = ({route}: Props) => {
  const [giftCard, setGiftCard] = useState<GiftCardType>()
  const navigation = useNavigation<NavigationProp>();
  const { giftCardProp } = route.params;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: giftCardProp?.name
    });
    fetchGiftCardDetails();
  }, [navigation, giftCardProp])
  
  const fetchGiftCardDetails = async() => {
    setGiftCard(giftCardProp)
    const giftCardData = await fetchGiftCardById(giftCardProp?.id.toString());
    if (giftCardData.data.id) setGiftCard(giftCardData.data)
  }

  const handlePurchase = (giftCardProp: GiftCardType) => {
    navigation.navigate('GiftCardsNavigation', {
      screen: 'Purchase',
      params: { giftCardProp }
    });
  }

  return (
    <SafeAreaView edges={["left", "right"] } style={styles.flex}>
        <View style={styles.flex}>
          <View style={[styles.container, styles.flex]}>
            <View 
              style={[styles.imageContainer, commonStyles.shadow, commonStyles.shadowBorderRadius]}
            >
              { giftCard && giftCard.images &&
                <ImageCarousel images={giftCard?.images}/>
              }
            </View>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={styles.content}>
                <Text style={[text.grey]}>{giftCard?.description}</Text>
                <Text style={[text.grey]}>{giftCard?.address?.line_one}</Text>
                <Text style={[text.grey]}>{giftCard?.address?.city}</Text>
                <Text style={[text.grey]}>{giftCard?.website}</Text>
                <Text style={[text.grey]}>{giftCard?.phone}</Text>
              </View>
              
              <View style={pb.sm}>
                <CustomButton label='Purchase' handlePress={()=>{handlePurchase(giftCard!)}} />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default CardDetailsScreen

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: undefined,
    aspectRatio: 4/3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: .9
  },
  content: {
    gap: 8,
    marginVertical: 16,
  }
})