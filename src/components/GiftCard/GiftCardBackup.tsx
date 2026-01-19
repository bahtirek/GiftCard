import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react';
import { GiftCardType } from '@/types';
import commonStyles from '@/styles/styles';
import { Colors, Font } from '@/styles/constants';

type GiftCardPropType = {
  giftCard: GiftCardType,
  showDescription: boolean,
  goToCardDetailsScreen: (id: string) => void
}


const GiftCard = ({ giftCard, showDescription = true, goToCardDetailsScreen}: GiftCardPropType, ) => {
  const {label, thumbnail, description, address} = giftCard;
  //const navigation = useNavigation();
  
/*   const goToCardDetailsScreen = () => {

  } */
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goToCardDetailsScreen.bind(this, giftCard.id)}
        style={[]}
      >
        <View style={[styles.card]}>
          <View style={[styles.imageContainer, commonStyles.shadow, commonStyles.shadowBorderRadius]}>
            <Image 
              source={{uri: thumbnail}}
              style={[styles.image]}
              resizeMode='cover'
            />
          </View>
          <View style={[styles.detailsContainer]}>
            <Text style={[styles.name]} numberOfLines={1}>{label}</Text>
            <Text style={[styles.address]} numberOfLines={1}>{address}</Text>
            {showDescription && <Text style={[styles.description]} numberOfLines={2}>{description}</Text>}
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
    borderRadius: 8,
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
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    opacity: .9
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