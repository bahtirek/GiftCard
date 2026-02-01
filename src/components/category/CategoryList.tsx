import { FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import { useCategoryStore } from '@/stores/category.store';

const CategoryList = () => {
  const categories = useCategoryStore(state => state.categories);
  return (
    <FlatList 
      data={categories}
      keyExtractor={(item) => item.label}
      renderItem={({item}) => (
        <CategoryItem item={item} />
      )}
      horizontal
      style={{paddingBottom: 12}}
    />
  )
}

export default CategoryList