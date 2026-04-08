import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { flex, pa } from '@/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageDetails from '@/components/account/details/name-description/ImageDetails';
import DescriptionDetails from '@/components/account/details/name-description/DescriptionDetails';
import AddressDetails from '@/components/account/details/address/AddressDetails';
import PriceDetails from '@/components/account/details/price/PriceDetails';
import SocialDetails from '@/components/account/details/social/SocialDetails';
import ContactsDetails from '@/components/account/details/contacts/ContactsDetails';

const DashboardAccountDetailsScreen = () => {

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow]}>
      <ScrollView style={[flex.flexGrow, pa.md]}>
        <ImageDetails />
        <DescriptionDetails />
        <AddressDetails />
        <ContactsDetails />
        <SocialDetails />
        <PriceDetails />
      </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardAccountDetailsScreen

const styles = StyleSheet.create({})