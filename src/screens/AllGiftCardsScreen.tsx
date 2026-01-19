import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import giftCards from '@/data/giftcards'
import GiftCard from '@/components/GiftCard/GiftCard'
import MainView from '@/components/common/MainView'
import { useNavigation } from '@react-navigation/native'
import IconButton from '@/components/UI/IconButton'


const AllCardsScreen = () => {
  const navigation = useNavigation();

  const onSearchIconPress = () => {
    console.log('search icon');
    
  }

  const goToCardDetailsScreen = (giftCardId: string) => {
    console.log('Go to card details for card id:', giftCardId);
    
    navigation.navigate('GiftCardDetails' as never);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton icon={'search'} onPress={onSearchIconPress} styles={styles.iconButton}/>
      },
    });
  }, [navigation, onSearchIconPress])

  return (
    <MainView>
      <View>
        <FlatList
          data={giftCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GiftCard giftCard={item} showDescription goToCardDetailsScreen={goToCardDetailsScreen} />
          )}
        />
      </View>
    </MainView>
  )
}

export default AllCardsScreen

const styles = StyleSheet.create({
  iconButton: {
    marginRight: 16
  }
})