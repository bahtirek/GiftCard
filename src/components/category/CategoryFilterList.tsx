import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CategoryCheckbox from './CategoryCheckbox';
import { useCategoryStore } from '@/stores/category.store';
import CustomCheckbox from '../UI/forms/CustomCheckbox';

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
        <CustomCheckbox label={item.label} checked={item.checked!} handelCheckBoxSelect={(value: boolean) => {handelCheckBoxSelect(item.id!, value)}}/>
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