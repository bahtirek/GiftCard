import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonModal from './CommonModal'
import CustomButton from '../buttons/CustomButton'
import { text } from '@/styles/styles'

type TryAgainLaterModalProp = {
  toggleModal: boolean,
  handlePress: () => void
}

const TryAgainLaterModal = ({toggleModal, handlePress}: TryAgainLaterModalProp) => {
  return (
    <CommonModal
      toggleModal={toggleModal}
      title="Oops..."
      content={(
        <View>
          <Text style={[text.md, text.grey]}>Sorry, Something Happened.</Text>
          <Text style={[text.md, text.grey]}>Please try again later.</Text>
        </View>
      )}
      action={(
        <CustomButton label='Ok' handlePress={handlePress} />
      )}
    />
  )
}

export default TryAgainLaterModal

const styles = StyleSheet.create({})