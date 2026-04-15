import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { flex, pa } from '@/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageDetails from '@/components/account/dashboard/details/name-description/ImageDetails';
import DescriptionDetails from '@/components/account/dashboard/details/name-description/DescriptionDetails';
import AddressDetails from '@/components/account/dashboard/details/address/AddressDetails';
import PriceDetails from '@/components/account/dashboard/details/price/PriceDetails';
import SocialDetails from '@/components/account/dashboard/details/social/SocialDetails';
import ContactsDetails from '@/components/account/dashboard/details/contacts/ContactsDetails';
import CustomCheckbox from '@/components/UI/forms/CustomCheckbox';
import HideOnSearch from '@/components/account/dashboard/details/hide-on-search/HideOnSearch';

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
        <HideOnSearch />
      </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardAccountDetailsScreen

const styles = StyleSheet.create({})