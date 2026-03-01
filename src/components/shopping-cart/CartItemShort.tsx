import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CartItemType } from 'src/types';
import { Colors } from '@/styles/constants';
import { pa, px, py } from '@/styles/styles';

type GiftCardPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
  isDisabled?: boolean,
  /* onPress?: () => void */
  onPress?: (orderId: string) => void
}

const GiftCard = ({cartItem, isDisabled=true, onPress}: GiftCardPropType, ) => {
  const {amount, name, orderDate } = cartItem;

  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress?.bind(null, cartItem.id!)}>
    {/* <TouchableOpacity disabled={isDisabled} onPress={onPress}> */}
    {/* <TouchableOpacity disabled={isDisabled} onPress={() => onPress?.(cartItem.id!)}> */}
      <View style={[px.md]}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title} numberOfLines={1}>{name}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueLabel}>Value:</Text>
              <Text style={styles.value}>{amount}</Text>
            </View>
            {
              orderDate && (
              <View style={styles.valueContainer}>
                <Text style={styles.valueLabel}>Order date:</Text>
                <Text style={styles.valueLabel}>{orderDate}</Text>
              </View>
            )
          }
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  innerContainer: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueLabel: {
    fontSize: 14,
    color: Colors.secondary800,
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    color: Colors.secondary800,
    marginTop: 5,
  },
});

export default GiftCard