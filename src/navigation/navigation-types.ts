import { NavigatorScreenParams } from "@react-navigation/native";
import { CartItemType, GiftCardType } from "@/types";

export type RootStackParamList = {
  MainTabsView: NavigatorScreenParams<MainTabParamList>;
  GiftCardDetails: { giftCardProp: GiftCardType };
  Settings: undefined;
  Payment: NavigatorScreenParams<PaymentStackParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  GiftCardsNavigation: NavigatorScreenParams<GiftCardsStackParamList>;
  CartNavigation: NavigatorScreenParams<CartStackParamList>;
  AccountNavigation: NavigatorScreenParams<AccountStackParamList>;
};

export type PaymentStackParamList = {
  PaymentScreen: undefined;
  ReviewScreen: undefined;
  ConfirmationScreen: undefined;
};

export type AccountStackParamList = {
  AccountScreen: undefined;
  ProfileScreen: undefined;
  OrdersScreen: undefined;
  OrderDetailsScreen: { orderId: string };
  RedeemScreen: undefined;

  DashboardScreen: undefined;
  DashboardListScreen: undefined;
  DashboardAccountsListScreen: undefined;
  DashboardPurchasedScreen: undefined;
  DashboardRedeemedScreen: undefined;
  DashboardAccountDetailsScreen: { giftCardProp: GiftCardType };
  DashboardRedeemersScreen: undefined;
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