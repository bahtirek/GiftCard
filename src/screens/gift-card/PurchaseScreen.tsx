import { Alert, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import PurchaseDetails from '@/components/common/PurchaseDetails';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GiftCardsStackParamList } from '@/navigation/navigation-types';
import { flex, mt, pb } from '@/styles/styles';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { useCartStore } from '@/stores/cart.store';
import { useProfileStore } from '@/stores/profile.store';
import { useLayoutEffect, useState } from 'react';
import { GiftCardType, InputValueType } from '@/types';
import RecepientDetails from '@/components/common/RecepientDetails';

type Props = NativeStackScreenProps<GiftCardsStackParamList, 'Purchase'>;

const PurchaseScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const {giftCardProp} = route.params;
  const addItem = useCartStore(state => state.addItem);
  const {profile} = useProfileStore();
  const [email, setEmail] = useState<InputValueType>({value: '', isValid: false});
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: false});
  const [note, setNote] = useState<InputValueType>({value: '', isValid: true});
  const [senderName, setSenderName] = useState<InputValueType>({value: '', isValid: true});
  const [isPhoneInputTouched, setIsPhoneInputTouched] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);

  const addToCart = () => {
    if (!email.value && !phone.value) {
      return Alert.alert('Missing data', "Please provide recepient details")
    }

    if(!isPhoneInputTouched && phone.value) {
      setIsPhoneInputTouched(true);
    }
    
    if(!isEmailInputTouched && email.value) {
      setIsEmailInputTouched(true);
    }

    addItem({
      id: '',
      amount: giftCardProp.tempAmount, 
      name: giftCardProp!.name, 
      image: giftCardProp!.images[0] || '', 
      giftCard: giftCardProp!, 
      email: email.value, 
      phone: phone.value, 
      note: note.value,
      profileId: profile.id,
      senderName: senderName.value
    });

    showSuccessAlert();
  }

  const showSuccessAlert = () => {
    Alert.alert('Success', 'Gift card added to cart', [
      {
        text: "OK",
        onPress: () => {navigateToAllCards()}
      }
    ]);
  }

  const navigateToAllCards = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'GiftCardsNavigation' as never }],
    });
  }

  const handleRecipientDetailsChange = (recepientDetails: {email?: InputValueType; phone?: InputValueType; note?: InputValueType; senderName?: InputValueType}) => {
    if(recepientDetails.email) setEmail(recepientDetails.email);
    if(recepientDetails.phone) setPhone(recepientDetails.phone);
    if(recepientDetails.note) setNote(recepientDetails.note);
    if(recepientDetails.senderName) setSenderName(recepientDetails.senderName);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
      contentContainerStyle={{flexGrow: 1}}
    >
      <ScrollView
        style={[flex.flex]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.container, styles.flex]}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={[styles.flex]}>
              <RecepientDetails 
                handleRecipientDetailsChange={handleRecipientDetailsChange}
                isPhoneInputTouched={isPhoneInputTouched} 
                isEmailInputTouched={isEmailInputTouched} 
              />
            </View>

            <View style={[pb.sm, mt.xxl, ]}>
              <CustomButton label='Add to Cart' handlePress={() => { addToCart() }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PurchaseScreen

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
})
