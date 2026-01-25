import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { usePreventBack } from '@/utils/use-prevent-back';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ExpoIcons from '@expo/vector-icons/Feather';
import { Colors } from '@/styles/constants';

const ConfirmationScreen = () => {
  usePreventBack();
  const navigation = useNavigation();

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabsView' as never }],
    })
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginTop: -100 }}>
        <ExpoIcons name="gift" size={60} color={Colors.primary500} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4B5563', textAlign: 'center', marginTop: 32, marginBottom: 16 }}>Congradulations!</Text>
        <Text style={{ fontSize: 18, marginBottom: 8, color: '#6B7280', textAlign: 'center' }}>Gift cards were sent to recepients</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* <Text style={{ fontSize: 18, color: '#6B7280', textAlign: 'center', paddingRight: 8 }}>Thanks for choosing</Text>
          <Text style={{ fontSize: 18, color: '#FCAF58', textAlign: 'center' }}>GiftGenie!</Text> */}
        </View>
        <TouchableOpacity onPress={goHome} activeOpacity={0.5}>
          <Text style={{ fontSize: 18, color: '#FCAF58', textDecorationLine: 'underline', marginTop: 10 }}>Return to home screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})