import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from './SafeView'
import CustomButton from '../UI/buttons/CustomButton'
import { Font } from '@/styles/constants'
import { text } from '@/styles/styles'

type ErrorViewProps = {
  message?: string;
  onRetry: () => void;
}

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <SafeView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[text.lg, text.grey]}>{message || 'Sorry something went wrong...'}</Text>
        <View>
          <CustomButton label="Retry" handlePress={onRetry} secondary />
        </View>
      </View>
    </SafeView>
  )
}

export default ErrorView;

const styles = StyleSheet.create({})