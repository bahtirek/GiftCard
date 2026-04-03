import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import ExpoIcons from '@expo/vector-icons/Feather';
import { ComponentProps } from 'react';
import { Colors } from '@/styles/constants';

type ContactsIconButtonType = {
  onPress: ()=>void
}

const ContactsIconButton = ({onPress}: ContactsIconButtonType) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <ExpoIcons name={'calendar'} size={28} color={Colors.primary600} style={styles.calendarIcon} />
        <ExpoIcons name={'user'} size={11} color={Colors.primary800} style={styles.userIcon} />
        {/* <ExpoIcons name={'book'} size={28} color={Colors.primary600} style={styles.calendarIcon} />
        <ExpoIcons name={'user'} size={12} color={Colors.primary800} style={styles.userIcon} /> */}
      </View>
    </Pressable>
  )
}

export default ContactsIconButton

const styles = StyleSheet.create({
  calendarIcon: {
    transform: [{ rotate: '270deg' }],
  },  
  userIcon: {
    position: 'absolute',
    top: 8,
    right: 4,
  }
})