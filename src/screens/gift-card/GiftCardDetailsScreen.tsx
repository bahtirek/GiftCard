import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useGiftCardsStore } from '@/stores/giftCard.store';
import { useNavigation, Link } from '@react-navigation/native';
import {commonStyles, pb, text} from '@/styles/styles';

const CardDetailsScreen = () => {
  const giftCard = useGiftCardsStore(state => state.giftCard);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: giftCard?.name
    });
  }, [navigation, giftCard])

  const handlePurchase = () => {
    console.log('Purchase gift card:', giftCard?.id);
    navigation.navigate('Purchase' as never);
  }

  return (
    <SafeAreaView edges={["left", "right"] } style={styles.flex}>
        <View style={styles.flex}>
          <View style={[styles.container, styles.flex]}>
            <View 
              style={[styles.imageContainer, commonStyles.shadow, commonStyles.shadowBorderRadius]}
            >
              <Image
                source={{uri: giftCard?.image}}
                resizeMode='cover'
                style={styles.image}
              />
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