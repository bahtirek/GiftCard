import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useNavigation, Link } from '@react-navigation/native';
import { commonStyles, flex, mt, pb, text } from '@/styles/styles';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { GiftCardsStackParamList, MainTabParamList } from '@/navigation/navigation-types';
import { fetchGiftCardById } from '@/api/gift-cards/search.api';
import { GiftCardType, InputValueType } from '@/types';
import AmountDetails from '@/components/common/AmountDetails';
import { useCartStore } from '@/stores/cart.store';
import GiftCardDetailsComplete from '@/components/GiftCard/GiftCardDetailsComplete';

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'GiftCardDetails'>;
type NavigationProp = NativeStackNavigationProp<MainTabParamList, 'GiftCardsNavigation'>;

const CardDetailsScreen = ({ route }: Props) => {
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

    giftCardProp.tempAmount = giftCardAmount.value;

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
    style={[flex.flex]}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
  >
    <ScrollView
      style={[flex.flex]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
        <View style={[styles.container, styles.flex]}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={[styles.flex]}>
              <GiftCardDetailsComplete giftCard={giftCard!}/>
              <View style={styles.separator} />
              <View style={[styles.flex]}>
                <AmountDetails
                  handleAmountChange={handleAmountChange}
                  priceSet={giftCardProp.priceSet!}
                  isOtherAmountInputTouched={isOtherAmountInputTouched}
                />
              </View>
            </View>

            <View style={[pb.sm, mt.xxl, ]}>
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
  separator: {
    backgroundColor: '#E2E2E2',
    height: 1,
    marginVertical: 24,
  }
})