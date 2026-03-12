import { NavigatorScreenParams } from "@react-navigation/native";
import { CartItemType, GiftCardType } from "@/types";

export type RootStackParamList = {
  MainTabsView: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  GiftCardsNavigation: NavigatorScreenParams<GiftCardsStackParamList>;
  CartNavigation: NavigatorScreenParams<CartStackParamList>;
  AccountNavigation: NavigatorScreenParams<AccountStackParamList>;
};

export type GiftCardsStackParamList = {
  AllGiftCards: { search: string };
  GiftCardDetails: { giftCardProp: GiftCardType };
  Purchase: { giftCardProp: GiftCardType };
};

export type CartStackParamList = {
  CartScreen: undefined;
  EditCartItem: { cartItem: CartItemType };
};

export type AccountStackParamList = {
  ProfileScreen: undefined;
  OrdersScreen: undefined;
  OrderDetailsScreen: { orderId: string };
  AccountScreen: undefined;
  RedeemScreen: undefined;
  
  DashboardScreen: undefined;
  DashboardListScreen: undefined;
  DashboardPurchasedScreen: undefined;
  DashboardRedeemedScreen: undefined;
  DashboardAccountDetailsScreen: { giftCardProp: GiftCardType };
};