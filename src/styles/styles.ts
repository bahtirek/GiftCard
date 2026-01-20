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

export const text = StyleSheet.create({
  grey: {
    color: Colors.secondary800
  }
})

export const pa= StyleSheet.create({
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
export const pl= StyleSheet.create({
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
export const pr= StyleSheet.create({
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
export const pt= StyleSheet.create({
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
export const pb= StyleSheet.create({
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
export const py= StyleSheet.create({
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
export const px= StyleSheet.create({
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