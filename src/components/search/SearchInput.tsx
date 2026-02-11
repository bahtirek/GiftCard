import { View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomInput from '../UI/forms/CustomInput';
import IconButton from '../UI/buttons/IconButton';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputValueType } from '@/types';
import { useIsFocused } from "@react-navigation/native";
import { useSearchStore } from '@/stores/search.store';
import debounce from 'lodash.debounce';


type CategoryListProps = {
  searchQueryProp?: string;
  handleSearchButton: () => void;
}

const SearchInput = ({ handleSearchButton, searchQueryProp }: CategoryListProps) => {
  const navigation = useNavigation();
  const [initialValue, setInitialValue] = useState('');
  const isFocused = useIsFocused();
  const setSearchQuery = useSearchStore(state => state.setSearchQuery)
  const searchQuery = useSearchStore(state => state.searchQuery)

  useEffect(() => {  
    if (searchQuery) {
      setInitialValue(searchQuery);
    }
  }, [isFocused]);

  const handleInput = (value: InputValueType) => {
    if (value.value.length > 2) {
      debouncedSearch(value.value)
    }
  }

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 500),
    []
  );
  
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

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
          presetValue={initialValue}
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
    paddingRight: 48,
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 26,
  },
});