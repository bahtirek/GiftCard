import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useAccountStore } from '@/stores/account.store';
import { useNavigation } from '@react-navigation/native';
import IconButton from '@/components/UI/buttons/IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { flex, pt } from '@/styles/styles';
import RedeemersList from '@/components/account/dashboard/redeemers/RedeemersList';

const DashboardRedeemersScreen = () => {
  const { account } = useAccountStore();
  const navigation = useNavigation();

  const openRedeemerFormScreen = () => {
    navigation.navigate('DashboardRedeemerFormScreen' as never)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton icon='user-plus' onPress={openRedeemerFormScreen} color="#FCAF58" />
      }
    });
  }, [navigation, account])

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow]}>
      <RedeemersList />
    </SafeAreaView>
  )
}

export default DashboardRedeemersScreen

const styles = StyleSheet.create({})