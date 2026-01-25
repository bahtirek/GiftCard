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
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <ExpoIcons name="gift" size={60} color={Colors.primary500} />
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>Gift cards were sent to recipients</Text>
        <View style={styles.row}>
        </View>
        <TouchableOpacity onPress={goHome} activeOpacity={0.5}>
          <Text style={styles.homeButtonText}>Return to home screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: -100,
  },
  icon: {
    // No style needed, handled by ExpoIcons props
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  homeButton: {
    marginTop: 10,
  },
  homeButtonText: {
    fontSize: 18,
    color: '#FCAF58',
    textDecorationLine: 'underline',
  },
})