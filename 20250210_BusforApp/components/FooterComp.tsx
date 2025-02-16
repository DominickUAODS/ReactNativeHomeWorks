import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { styles } from "../styles/styles";

export default function FooterComp(): React.ReactElement {
	const [isPortrait, setIsPortrait] = useState(
		Dimensions.get("window").height > Dimensions.get("window").width
	);

	useEffect(() => {
		const updateOrientation = ({
			window,
		}: {
			window: { width: number; height: number };
		}) => {
			setIsPortrait(window.height > window.width);
		};

		const subscription = Dimensions.addEventListener("change", updateOrientation);
		return () => subscription?.remove();
	}, []);

	return (
		<View style={[styles.footer, isPortrait ? styles.footerPortrait : styles.footerLandscape]}>
			<Text>Поиск</Text>
			<Text>Мои поездки</Text>
			<Text>Контакты</Text>
			<Text>Профиль</Text>
		</View>
	);
};