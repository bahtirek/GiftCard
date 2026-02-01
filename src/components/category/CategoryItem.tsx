import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { CategoryItemType } from 'src/types'
import { useCategoryStore } from '@/stores/category.store';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '@/styles/styles';

type CategoryItemPropType = {
  item: CategoryItemType,
}

const CategoryItem = ({item}: CategoryItemPropType) => {
  const updateCategories = useCategoryStore(state => state.updateCategories);
  const resetCategories = useCategoryStore(state => state.resetCategories);
  const navigation = useNavigation()
  const handelCheckBoxSelect = (id: string) => {
    resetCategories();
    updateCategories(id, true);
    navigation.navigate('GiftCardsNavigation' as never);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handelCheckBoxSelect(item.id!)}
      style={styles.container}
      
    >
      <View style={[styles.itemBox, commonStyles.shadow ]}>
        <ImageBackground 
          source={{uri: item.icon}}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  itemBox: {
    padding: 12,
    margin: 4,
    borderRadius: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: "rgba(152, 152, 152, 0.5)",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.4,
        shadowRadius: 7,
      },
      android: {
        elevation: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  },
  image: {
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#1A1A1A', // replace with your primary color if different
  },
});

export default CategoryItem