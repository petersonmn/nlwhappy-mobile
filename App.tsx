import React from 'react';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import Routes from './src/routes';


export default function App() {
	const [fontsLoaded] = useFonts({
		nunito_600: Nunito_600SemiBold,
		nunito_700: Nunito_700Bold,
		nunito_800: Nunito_800ExtraBold
	});

	if (!fontsLoaded) {
		return (
			<AppLoading />
		)
	}

	return (
		<Routes />
	);
}
