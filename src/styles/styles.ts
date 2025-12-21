import { StyleSheet, Platform } from 'react-native'

const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    elevation: 5,
    backgroundColor: 'white'
  },
  shadowBorderRadius: {
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.5
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default commonStyles;