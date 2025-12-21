import { TextInput, TextInputProps } from "react-native"

export type CustomButtonType = {
  label: string, 
  containerStyles?: string,
  handlePress?: any,
  textStyles?: string, 
  isLoading?: boolean 
}

export type ListItemType = {
  label: string, 
  containerStyles?: string,
  handlePress?: any
}

export type FormFieldType = {
  title?: string, 
  value?: string, 
  placeholder?: string, 
  handleChangeText?: any, 
  otherStyles?: string,
} & React.ComponentPropsWithoutRef<typeof TextInput>;

export type CategoryItemType = {
  label?: string,
  icon?: string,
  id?: string,
  checked?: boolean
};

export type GiftCardType = {
  id: string,
  label?: string,
  thumbnail?: string,
  description?: string,
  address?: string,
  phone?: string,
  website?: string,
  instagram?: string,
  telegram?: string,
  priceSet?: PriceType[],
  showDescription?: boolean 
};

export type CreatorType = {
  username: string,
  avatar: string
}

export type LocationType = {
  id?: string,
  name?: string
}

export type PriceType = {
  id: string,
  amount: string
}

export type CartItemType = {
  id?: string,
  quantity?: number,
  amount?: string,
  email?: string,
  phone?: string,
  note?: string,
  giftCard?: GiftCardType
  otherAmount?: string,
  orderedDate?: string
}

export type PaymentType = {
  cardholderName?: string,
  creditCard?: string,
  expDate?: string,
  cvv?: string,
}

export type AccountType = {
  phone?: string,
  name?: string,
}

export type InputValueType = {
  value: string,
  isValid?: boolean,
}