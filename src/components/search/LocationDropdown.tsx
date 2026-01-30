import { Platform, StyleSheet, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { useLocationStore } from '@/stores/location.store';
import { Colors } from '@/styles/constants';


const LocationDropdown = () => {
  const locations = useLocationStore(state => state.locations);
  const location = useLocationStore(state => state.location);
  const updateLocation = useLocationStore(state => state.updateLocation);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if(location) setSelectedLocation(location.id!)
  }, [location])

  const setLocation = (locationId: string) => {
    setSelectedLocation(locationId)
    updateLocation(locationId)
  }

  return (
    <View style={[styles.container, isFocused && { borderColor: Colors.primary500, borderWidth: 1 }]}> 
      <Picker
        style={styles.picker}
        selectedValue={selectedLocation}
        onValueChange={(locationId) => setLocation(locationId)}
        >
        {
          locations?.map((location) => {
            return <Picker.Item label={location.name} value={location.id} key={location.id} />
          })
        }
      </Picker>
    </View>
  )
}

export default LocationDropdown;

const styles = StyleSheet.create({
  container: {
  ...Platform.select({
      android: {
        height: 56,
        borderRadius: 12,
        borderColor: Colors.primary500,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        color: Colors.secondary700,
        width: '100%',
      }
    })
  },
  picker: {
  ...Platform.select({
      android: {

        width: '100%',
      }
    })
  }
});