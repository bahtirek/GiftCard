import { StyleSheet, Platform } from 'react-native'
import { Colors } from './constants'

export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    elevation: 5,
    backgroundColor: 'white'
  },
  shadowBorderRadius: {
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.5
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export const flex = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
})

export const text = StyleSheet.create({
  grey: {
    color: Colors.secondary800
  },
  primary: {
    color: Colors.primary
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 20,
  }, 
  xl: {
    fontSize: 24,
  },
})

export const pa = StyleSheet.create({
  xs: {
    padding: 4,
  },
  sm: {
    padding: 8,
  },
  md: {
    padding: 16,
  },
  lg: {
    padding: 24,
  },
  xl: {
    padding: 32,
  },
  xxl: {
    padding: 48,
  },
})
export const pl = StyleSheet.create({
  xs: {
    paddingLeft: 4,
  },
  sm: {
    paddingLeft: 8,
  },
  md: {
    paddingLeft: 16,
  },
  lg: {
    paddingLeft: 24,
  },
  xl: {
    paddingLeft: 32,
  },
  xxl: {
    paddingLeft: 48,
  },
})
export const pr = StyleSheet.create({
  xs: {
    paddingRight: 4,
  },
  sm: {
    paddingRight: 8,
  },
  md: {
    paddingRight: 16,
  },
  lg: {
    paddingRight: 24,
  },
  xl: {
    paddingRight: 32,
  },
  xxl: {
    paddingRight: 48,
  },
})
export const pt = StyleSheet.create({
  xs: {
    paddingTop: 4,
  },
  sm: {
    paddingTop: 8,
  },
  md: {
    paddingTop: 16,
  },
  lg: {
    paddingTop: 24,
  },
  xl: {
    paddingTop: 32,
  },
  xxl: {
    paddingTop: 48,
  },
})
export const pb = StyleSheet.create({
  xs: {
    paddingBottom: 4,
  },
  sm: {
    paddingBottom: 8,
  },
  md: {
    paddingBottom: 16,
  },
  lg: {
    paddingBottom: 24,
  },
  xl: {
    paddingBottom: 32,
  },
  xxl: {
    paddingBottom: 48,
  },
})
export const py = StyleSheet.create({
  xs: {
    paddingVertical: 4,
  },
  sm: {
    paddingVertical: 8,
  },
  md: {
    paddingVertical: 16,
  },
  lg: {
    paddingVertical: 24,
  },
  xl: {
    paddingVertical: 32,
  },
  xxl: {
    paddingVertical: 48,
  },
})
export const px = StyleSheet.create({
  xs: {
    paddingHorizontal: 4,
  },
  sm: {
    paddingHorizontal: 8,
  },
  md: {
    paddingHorizontal: 16,
  },
  lg: {
    paddingHorizontal: 24,
  },
  xl: {
    paddingHorizontal: 32,
  },
  xxl: {
    paddingHorizontal: 48,
  },
})

export const ma = StyleSheet.create({
  xs: {
    margin: 4,
  },
  sm: {
    margin: 8,
  },
  md: {
    margin: 16,
  },
  lg: {
    margin: 24,
  },
  xl: {
    margin: 32,
  },
  xxl: {
    margin: 48,
  },
})
export const ml = StyleSheet.create({
  xs: {
    marginLeft: 4,
  },
  sm: {
    marginLeft: 8,
  },
  md: {
    marginLeft: 16,
  },
  lg: {
    marginLeft: 24,
  },
  xl: {
    marginLeft: 32,
  },
  xxl: {
    marginLeft: 48,
  },
})
export const mr = StyleSheet.create({
  xs: {
    marginRight: 4,
  },
  sm: {
    marginRight: 8,
  },
  md: {
    marginRight: 16,
  },
  lg: {
    marginRight: 24,
  },
  xl: {
    marginRight: 32,
  },
  xxl: {
    marginRight: 48,
  },
})
export const mt = StyleSheet.create({
  xs: {
    marginTop: 4,
  },
  sm: {
    marginTop: 8,
  },
  md: {
    marginTop: 16,
  },
  lg: {
    marginTop: 24,
  },
  xl: {
    marginTop: 32,
  },
  xxl: {
    marginTop: 48,
  },
})
export const mb = StyleSheet.create({
  xs: {
    marginBottom: 4,
  },
  sm: {
    marginBottom: 8,
  },
  md: {
    marginBottom: 16,
  },
  lg: {
    marginBottom: 24,
  },
  xl: {
    marginBottom: 32,
  },
  xxl: {
    marginBottom: 48,
  },
})
export const my = StyleSheet.create({
  xs: {
    marginVertical: 4,
  },
  sm: {
    marginVertical: 8,
  },
  md: {
    marginVertical: 16,
  },
  lg: {
    marginVertical: 24,
  },
  xl: {
    marginVertical: 32,
  },
  xxl: {
    marginVertical: 48,
  },
})
export const mx = StyleSheet.create({
  xs: {
    marginHorizontal: 4,
  },
  sm: {
    marginHorizontal: 8,
  },
  md: {
    marginHorizontal: 16,
  },
  lg: {
    marginHorizontal: 24,
  },
  xl: {
    marginHorizontal: 32,
  },
  xxl: {
    marginHorizontal: 48,
  },
})