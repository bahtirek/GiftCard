import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CategoryCheckbox from './CategoryCheckbox';
import { useCategoryStore } from '@/stores/category.store';

const CategoryFilterList = () => {
  const updateCategories = useCategoryStore(state => state.updateCategories);
  const categories = useCategoryStore(state => state.categories);

  const handelCheckBoxSelect = (id: string, value: boolean) => {
    updateCategories(id, value)
  }
  
  return (
    <FlatList
      scrollEnabled={false}
      style={styles.container}
      data={categories}
      keyExtractor={(item) => item.id!}
      renderItem={({item}) => (
        <CategoryCheckbox item={item} handelCheckBoxSelect={(value: boolean) => {handelCheckBoxSelect(item.id!, value)}}/>
      )}
    />
  )
}

export default CategoryFilterList

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 0,
  },
})