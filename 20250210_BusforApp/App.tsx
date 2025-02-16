import { ImageBackground, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles/styles";
import HeaderComp from "./components/HeaderComp";
import DateAndPassengersComp from "./components/DateAndPassengersComp";
import SearchButtonComp from "./components/SearchButtonComp";
import FooterComp from "./components/FooterComp";
import SearchFieldComp from "./components/SearchFieldComp";
import PromoBannerComp from "./components/PromoBannerComp";
const background = require("./assets/background.jpg")

export default function App() {
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
		<ImageBackground source={background} style={styles.background}>
			<ScrollView contentContainerStyle={isPortrait ? styles.containerPortrait : styles.containerLandscape}>
				<HeaderComp />
				<PromoBannerComp />
				<SearchFieldComp placeholder="Откуда" />
				<SearchFieldComp placeholder="Куда" />
				<DateAndPassengersComp />
				<SearchButtonComp />
				<FooterComp />
			</ScrollView>
		</ImageBackground>
	);
};