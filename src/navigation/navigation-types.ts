import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { CartItemType } from "@/types";

// Define the parameters for the Cart stack navigator
export type CartStackParamList = {
  CartScreen: undefined;
  EditCartItem: { cartItem: CartItemType };
};

export type GiftCardsStackParamList = {
  AllGiftCards: { search: string };
  GiftCardDetails: { giftCardId: string };
  Purchase: undefined
};

export type OrdersStackParamList = {
  AllOrders: { search: string };
  OrderDetails: { orderId: string };
};

// Define the parameters for the main stack navigator
export type RootStackParamList = {
  MainTabsView: NavigatorScreenParams<MainTabParamList>;
  GiftCardDetails: { giftCardId: string };
  Settings: undefined;
  Payment: undefined;
  GiftCardsNavigation: NavigatorScreenParams<GiftCardsStackParamList>;
  AccountNavigation: NavigatorScreenParams<AccountStackParamList>;
};

export type AccountStackParamList = {
  ProfileScreen: undefined;
  OrdersScreen: undefined;
  OrderDetailsScreen: { orderId: string };
  DashboardScreen: undefined;
  AccountScreen: undefined;
  RedeemScreen: undefined;
};

// Define the props for screens in the main stack navigator
/* export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>; */

// Define the props for screens in the main tab navigator
/* export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>; */

// Define the parameters for the main tab navigator
export type MainTabParamList = {
  Home: undefined;
  Cart: NavigatorScreenParams<CartStackParamList>;
  Profile: undefined;
};