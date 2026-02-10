import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react';
import { GiftCardType } from '@/types';
import { Colors, Font } from '@/styles/constants';
import { useGiftCardsStore } from '@/stores/giftCard.store';
import { commonStyles } from '@/styles/styles';

type GiftCardPropType = {
  giftCard: GiftCardType,
  showDescription?: boolean,
  customeStyle?: object,
  goToCardDetailsScreen?: (id: string) => void
}


const GiftCard = ({ giftCard, showDescription = true, goToCardDetailsScreen}: GiftCardPropType, ) => {
  const setGiftCard = useGiftCardsStore(state => state.setGiftCard);
  const handlePress = () => {
    setGiftCard(giftCard);
    goToCardDetailsScreen?.(giftCard.id!.toString());
  }
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={[]}
      >
        <View style={[styles.card]}>
          <View style={[styles.imageContainer, commonStyles.shadow]}>
            <Image 
              source={{uri: giftCard.image}}
              style={[styles.image]}
              resizeMode='cover'
            />
          </View>
          <View style={[styles.detailsContainer]}>
            <Text style={[styles.name]} numberOfLines={1}>{giftCard.name}</Text>
            <Text style={[styles.address]} numberOfLines={1}>{giftCard.address?.line_one}, {giftCard.address?.city}</Text>
            {showDescription && <Text style={[styles.description]} numberOfLines={2}>{giftCard.description}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  imageContainer: {
    width: 88,
    height: 88,
    flexBasis: 88,
    borderRadius: 16,
    backgroundColor: '#fff',
/*     ...Platform.select({
      ios: {
        shadowColor: "rgba(152, 152, 152, 0.6)",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.4,
        shadowRadius: 7,
      },
      android: {
        elevation: 8,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    }) */
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: .9,
    overflow: 'hidden'
  },
  detailsContainer: {
    paddingBottom: 4,
    paddingLeft: 16,
    rowGap: 4,
    flexGrow: 1,
    width: 0
  },
  name: {
    fontSize: Font.xl,
    color: Colors.primary,
    fontWeight: 'normal'
  },
  address: {
    fontSize: Font.sm,
    color: Colors.secondary800,
    fontWeight: 'normal'
  },
  description: {
    fontSize: Font.xs,
    color: Colors.secondary600,
    fontWeight: 'normal',
  }
});

export default GiftCard