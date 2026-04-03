import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { usePreventBack } from '@/utils/use-prevent-back';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ExpoIcons from '@expo/vector-icons/Feather';
import { Colors } from '@/styles/constants';
import { useProfileStore } from '@/stores/profile.store';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useAppRoutes } from '@/navigation/useAppRoutes';

const ConfirmationScreen = () => {
  usePreventBack();
  const navigation = useNavigation();
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const { profile } = useProfileStore();
  const { goToAccountReset } = useAppRoutes();

  const goHome = () => {
    if (!profile.phone) {
      setShowCreateProfile(true);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabsView' as never }],
      })
    }
  }

  const onCreateProfileButtonClick = () => {
    goToAccountReset('ProfileScreen');
  }


  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.iconsContainer}>
          <ExpoIcons name="bar-chart-2" size={54} color={Colors.primary500} style={styles.chartIcon} />
          <ExpoIcons name="gift" size={54} color={Colors.primary500} />
        </View>
        <Text style={styles.subtitle}>Gift cards were sent successfully</Text>
        {showCreateProfile &&
          <>
            <Text style={styles.title}>Don’t lose access to your order</Text>
            <Text style={styles.subtitle}>Create a profile to securely manage your gift card, track its status, and resend it if needed.</Text>
            <View>
              <CustomButton label={'Create Profile'} handlePress={onCreateProfileButtonClick} secondary />
            </View>
          </>
        }
        <View>
          <CustomButton label={'Return to home screen'} handlePress={goHome} secondary />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: -150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary500,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: Colors.secondary600,
    textAlign: 'center',
    maxWidth: 320,
  },
  iconsContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    paddingRight: 32,
  },
  chartIcon: {
    transform: [{ rotate: '270deg' }],
    marginBottom: -10,
    marginRight: -12,
  },
  homeButton: {
    marginTop: 32,
  },
  homeButtonText: {
    fontSize: 18,
    color: '#FCAF58',
    textDecorationLine: 'underline',
  }
})