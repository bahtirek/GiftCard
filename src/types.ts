import { TextInput, TextInputProps } from "react-native"

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
  label: string,
  icon?: string,
  id: string,
  checked?: boolean
};

export type GiftCardType2 = {
  id?: string,
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

export type GiftCardType = {
  id: number,
  name: string,
  image: string,
  description: string,
  phone: string,
  website?: string,
  address?: Address,
  instagram?: string,
  telegram?: string,
  priceSet?: PriceType[],
  showDescription?: boolean
  geo?: {
    lat: number,
    lng: number
  },
  distanceKm?: number,
  isFeatured?: boolean,
  isPromoted?: boolean,
};

export type Address = {
  line_one: string,
  line_two: string,
  city: string,
  zip: string
};

export type GiftCardsStoreState = {
  giftCard: GiftCardType;
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
  giftCardId?: number,
  giftCard?: GiftCardType
  otherAmount?: string,
  orderDate?: string,
  name?: string,
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

export type ProfileType = {
  isRegistered: boolean
  id?: string,
  phone?: string
  firstName?: string,
  lastName?: string,
  token?: string,
  timestamp?: number,
  pin?: string,
  nameUpdatedSkiped?: boolean,
  tempPhone?: string
}