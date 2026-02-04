import { View, Alert } from 'react-native'
import React, {  use, useEffect, useState } from 'react'
import CustomInput from '../UI/forms/CustomInput';
import IconButton from '../UI/buttons/IconButton';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputValueType } from '@/types';

type CategoryListProps = {
  searchQueryProp?: string;
  handleSearchQuery: (query: string) => void;
  handleSearchButton: () => void;
}

const SearchInput = ({ handleSearchQuery, handleSearchButton, searchQueryProp }: CategoryListProps) => {
  const navigation = useNavigation();
  const [initialValue, setInitialValue] = useState('');

  useEffect(() => {
    if (searchQueryProp) {
      setInitialValue(searchQueryProp);
    }
  }, [searchQueryProp]);

  const handleInput = (value: InputValueType) => {
    if (value.value.length > 2) {
      handleSearchQuery(value.value);
    }
  }

  const openSettings = () => {
    navigation.navigate('Settings' as never);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <CustomInput
          onInput={(value: InputValueType) => { handleInput(value) }}
          placeholder='Search for perfect gift'
          style={styles.input}
        />

        <View style={styles.searchIconWrapper}>
          <IconButton icon={'search'} onPress={handleSearchButton} />
        </View>
      </View>

      <View>
        <IconButton icon={'sliders'} onPress={openSettings} />
      </View>
    </View>
  )
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    paddingRight: 14,
  },
  input: {
    paddingRight: 48, // pr-12 (12 * 4 = 48)
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 26, // right-4 (4 * 4 = 16)
  },
});