import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export const usePreventBack = () => {
	const navigation = useNavigation();

	useFocusEffect(() => {
		navigation.setOptions({
			headerLeft: () => null,
			gestureEnabled: false,
		});

		navigation.getParent()?.setOptions({ gestureEnabled: false });

		const hardwareBackPressHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				return true;
			}
		);

		return () => {
			navigation.getParent()?.setOptions({ gestureEnabled: true });
			navigation.setOptions({
				gestureEnabled: true,
			});
			hardwareBackPressHandler.remove();
		};
	});
};