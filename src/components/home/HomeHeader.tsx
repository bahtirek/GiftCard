import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import icons from '@/data/icons';
import { Colors } from '@/styles/constants';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <View>
          {/* <Text className='text-xs font-pregular text-gray-600'>Unwrap Joy, Anytime, Anywhere!</Text> */}
          <Text style={styles.subtitle}>Your One-Stop Gift Card Shop!</Text>
          <Text style={styles.title}>GiftCard Genie</Text>
        </View>
        <View>
          <Image
            source={icons.giftCard}
            style={styles.giftCardImage}
            resizeMode='contain'
          />
        </View>
      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 6,
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
      }
    })
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14, // text-sm
    fontFamily: 'PRegular', // font-pregular
    color: '#4B5563', // text-gray-600
  },
  title: {
    fontSize: 26, // text-3xl
    fontFamily: 'PSemibold', // font-psemibold
    color: Colors.primary, // text-primary
  },
  giftCardImage: {
    width: 80, // !w-20
    height: 56, // !h-14
    resizeMode: 'contain',
  },
})