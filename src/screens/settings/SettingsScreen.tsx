import { View, Text, StyleSheet,  Platform, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilterList from '@/components/category/CategoryFilterList';
import LocationDropdown from '@/components/search/LocationDropdown';
import { Colors } from '@/styles/constants';


const SettingsScreen = () => {
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.categoryText}>Category</Text>
            <CategoryFilterList />
          <Text style={styles.locationText}>Location</Text>
          <View style={styles.dropdown}>
            <LocationDropdown />
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  dropdown: {
    marginTop: 8,
  },
})