import { CommonActions } from "@react-navigation/native";
import { AccountStackParamList } from "./navigation-types";
import { useAppNavigation } from "./useAppNavigation";

export const useAppRoutes = () => {
  const navigation = useAppNavigation();

  const goToAccount = (
    screen: keyof AccountStackParamList,
    params?: any
  ) => {
    navigation.navigate('MainTabsView', {
      screen: 'AccountNavigation',
      params: {
        screen,
        params,
      },
    });
  };

  const goToAccountReset = (
    screen: keyof AccountStackParamList,
    params?: any
  ) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabsView',
            params: {
              screen: 'AccountNavigation',
              params: {
                screen,
                params,
              },
            },
          },
        ],
      })
    );
  };

  return { navigation, goToAccount, goToAccountReset };
};