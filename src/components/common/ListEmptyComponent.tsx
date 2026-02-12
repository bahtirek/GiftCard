import { View,  Text, StyleSheet } from 'react-native'
import React from 'react'
import IconButton from '../UI/buttons/IconButton'
import ExpoIcons from '@expo/vector-icons/Feather';
import { Colors } from '@/styles/constants';
import { mt, text } from '@/styles/styles';

export type ExpoIconType = keyof typeof ExpoIcons.glyphMap;

type EmptyStateType = {
  title?: string,
  subtitle?: string,
  icon?: ExpoIconType,
  actionIcon?: ExpoIconType, 
  handleAction?: any
}

const ListEmptyComponent = ({title, subtitle, icon="gift", actionIcon, handleAction}: EmptyStateType) => {
  return (
    <View style={[styles.container]}>
      <ExpoIcons name={icon} size={60} color={Colors.primary300} />
     <Text style={[mt.xl, text.grey, text.md]}>{title}</Text>
      <Text style={[mt.xxl, text.grey]}>{subtitle}</Text>
      <View style={[mt.xl]}>
        {
          actionIcon &&
          <IconButton icon={actionIcon} onPress={handleAction} />
        }
      </View>
    </View>
  )
}

export default ListEmptyComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '70%'
  },
  icon: {

  }
})