import { StyleSheet} from 'react-native'
import { flex, pt} from '@/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useProfileStore } from '@/stores/profile.store'
import { GiftCardType } from '@/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainTabParamList} from '@/navigation/navigation-types'
import { useAccountStore } from '@/stores/account.store'
import AccountsList from '@/components/account/dashboard/AccountList'

type NavigationProp = NativeStackNavigationProp<MainTabParamList, 'AccountNavigation'>;

const DashboardAccountsListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { profile} = useProfileStore();
  const { setAccount } = useAccountStore();

  const onSetAccount = (giftCardProp: GiftCardType) => {
    setAccount(giftCardProp);
    navigation.goBack();
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={[flex.flexGrow, pt.md]}>
      <AccountsList profile={profile} onSetAccount={onSetAccount} />
    </SafeAreaView>
  )
}

export default DashboardAccountsListScreen

const styles = StyleSheet.create({})