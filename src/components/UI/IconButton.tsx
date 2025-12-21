import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import ExpoIcons from '@expo/vector-icons/Feather';
import { ComponentProps } from 'react';

type IconButtonType = {
  icon: ComponentProps<typeof ExpoIcons>['name'],
  onPress: ()=>void
  size?: number,
  color?: string,
  styles?: StyleProp<ViewStyle>
}

const IconButton = ({icon, size=24, color='#FF4416', onPress, styles}: IconButtonType) => {
  return (
    <Pressable onPress={onPress} style={styles}>
      <View>
        <ExpoIcons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({})