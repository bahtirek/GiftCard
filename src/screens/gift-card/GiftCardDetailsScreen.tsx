import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useNavigation, Link } from '@react-navigation/native';
import { commonStyles, mt, pb, text } from '@/styles/styles';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { GiftCardsStackParamList, MainTabParamList } from '@/navigation/navigation-types';
import { fetchGiftCardById } from '@/api/gift-cards/search.api';
import { GiftCardType, InputValueType } from '@/types';
import ImageCarousel from '@/components/common/ImageCarousel';
import { Colors } from '@/styles/constants';
import AmountDetails from '@/components/common/AmountDetails';
import { useCartStore } from '@/stores/cart.store';

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'GiftCardDetails'>;
type NavigationProp = NativeStackNavigationProp<MainTabParamList, 'GiftCardsNavigation'>;

const CardDetailsScreen = ({ route }: Props) => {
  const addItem = useCartStore(state => state.addItem);
  const [giftCard, setGiftCard] = useState<GiftCardType>()
  const navigation = useNavigation<NavigationProp>();
  const { giftCardProp } = route.params;
  const [giftCardAmount, setGiftCardAmount] = useState<InputValueType>({value: '', isValid: false});
  const [isOtherAmountInputTouched, setIsOtherAmountInputTouched] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: giftCardProp?.name
    });
    fetchGiftCardDetails();
  }, [navigation, giftCardProp])

  const fetchGiftCardDetails = async () => {
    setGiftCard(giftCardProp)
    const giftCardData = await fetchGiftCardById(giftCardProp?.id.toString());
    if (giftCardData.data.id) setGiftCard(giftCardData.data)
  }

  const handleSelectButtonClick = (giftCardProp: GiftCardType) => {
    if(!giftCardAmount || !giftCardAmount.isValid) {
      return Alert.alert('Missing data', "Please select amount")
    };
      
    if(!isOtherAmountInputTouched && giftCardAmount) {
      setIsOtherAmountInputTouched(true);
    }

    addItem({
      amount: giftCardAmount.value, 
      name: giftCardProp!.name, 
      image: giftCardProp!.images[0] || '', 
      giftCard: giftCardProp!, 
    });
    
    navigation.navigate('GiftCardsNavigation', {
      screen: 'Purchase',
      params: { giftCardProp }
    });
  }

  const handleAmountChange = (amount: InputValueType) => {
    setGiftCardAmount(amount);
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
      contentContainerStyle={{flexGrow: 1}}>
      <ScrollView>
        <View style={[styles.container, styles.flex]}>
          <View style={[styles.imageContainer, commonStyles.shadow, commonStyles.shadowBorderRadius]}>
            {giftCard && giftCard.images &&
              <ImageCarousel images={giftCard?.images} />
            }
          </View>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={[styles.flex]}>
              <View style={styles.content}>
                <Text style={[text.grey]}>{giftCard?.description}</Text>
                <Text style={[text.grey]}>{giftCard?.address?.line_one}</Text>
                <Text style={[text.grey]}>{giftCard?.address?.city}</Text>
                <Text style={[text.grey]}>{giftCard?.website}</Text>
                <Text style={[text.grey]}>{giftCard?.phone}</Text>
              </View>
              <View style={styles.separator} />
              <View style={[styles.flex]}>
                <AmountDetails
                  handleAmountChange={handleAmountChange}
                  priceSet={giftCardProp.priceSet!}
                  isOtherAmountInputTouched={isOtherAmountInputTouched}
                />
              </View>
            </View>

            <View style={[pb.sm, mt.xxl]}>
              <CustomButton label='Select' handlePress={() => { handleSelectButtonClick(giftCard!) }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    height: 230,
    //aspectRatio: 4/3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: .9
  },
  content: {
    gap: 8,
    paddingBottom: 16,
  },
  separator: {
    backgroundColor: '#E2E2E2',
    height: 1,
    marginVertical: 16,
  }
})