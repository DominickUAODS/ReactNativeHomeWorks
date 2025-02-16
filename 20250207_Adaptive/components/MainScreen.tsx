import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Dimensions, Text, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import RouteCard from "./RouteCard";

interface Route {
	id: string;
	departureTime: string;
	duration: string;
	arrivalTime: string;
	price: string;
	departureLocation: string;
	arrivalLocation: string;
	carrier: string;
	seatsAvailable: number;
	isPrintable: boolean;
}

const routes: Array<Route> = [
	{
		id: "1",
		departureTime: "08:00",
		duration: "6 год. 45 хв.",
		arrivalTime: "14:45",
		price: "585",
		departureLocation: "Автостанція 'Привокзальна'",
		arrivalLocation: "Зупинка громадського транспорту 'Метро Теремки'",
		carrier: "АТП 15107",
		seatsAvailable: 10,
		isPrintable: false,
	},
	{
		id: "2",
		departureTime: "08:15",
		duration: "6 год. 30 хв.",
		arrivalTime: "14:45",
		price: "585",
		departureLocation: "Зупинка тролейбусу №8",
		arrivalLocation: "Зупинка громадського транспорту 'Метро Теремки'",
		carrier: "АТП 15107",
		seatsAvailable: 10,
		isPrintable: false,
	},
	{
		id: "3",
		departureTime: "08:00",
		duration: "7 год. 0 хв.",
		arrivalTime: "15:00",
		price: "585",
		departureLocation: "Автостанція 'Привокзальна'",
		arrivalLocation: "Автовокзал 'Центральний', метро Деміївська",
		carrier: "АТП 15107",
		seatsAvailable: 10,
		isPrintable: false,
	},
	{
		id: "4",
		departureTime: "12:00",
		duration: "6 год. 45 хв.",
		arrivalTime: "18:45",
		price: "595",
		departureLocation: "Автостанція 'Привокзальна'",
		arrivalLocation: "Зупинка громадського транспорту 'Метро Теремки'",
		carrier: "АТП 15109",
		seatsAvailable: 15,
		isPrintable: false,
	},
	{
		id: "5",
		departureTime: "15:00",
		duration: "6 год. 45 хв.",
		arrivalTime: "21:45",
		price: "605",
		departureLocation: "Автостанція 'Привокзальна'",
		arrivalLocation: "Зупинка громадського транспорту 'Метро Теремки'",
		carrier: "АТП 15109",
		seatsAvailable: 12,
		isPrintable: true,
	},
];

export default function MainScreen(): React.ReactElement {
	const [isLandscape, setIsLandscape] = useState(Dimensions.get("window").width > Dimensions.get("window").height);

	useEffect(() => {
		const updateOrientation = () => {
			setIsLandscape(Dimensions.get("window").width > Dimensions.get("window").height);
		};
		const subscription = Dimensions.addEventListener("change", updateOrientation);
		return () => subscription?.remove();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={[styles.container, isLandscape ? styles.landscape : styles.portrait]}>
				{isLandscape ? <LandscapeView /> : <PortraitView />}
				<StatusBar backgroundColor="#F9253E" />
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const cardWidth = Dimensions.get("window").width / 2 * 0.8;

const PortraitView = () => (
	<SafeAreaView style={[styles.container, styles.portrait]}>
		<FlatList
			data={routes}
			keyExtractor={(item) => item.id}
			numColumns={1}
			renderItem={({ item }) => (
				<RouteCard
					departureTime={item.departureTime}
					duration={item.duration}
					arrivalTime={item.arrivalTime}
					price={item.price}
					departureLocation={item.departureLocation}
					arrivalLocation={item.arrivalLocation}
					carrier={item.carrier}
					seatsAvailable={item.seatsAvailable}
					isPrintable={item.isPrintable}
				/>
			)}
		/>
	</SafeAreaView>
);

const LandscapeView = () => (
	<SafeAreaView style={[styles.container, styles.landscape]}>
		<FlatList
			data={routes}
			keyExtractor={(item) => item.id}
			horizontal={false}
			numColumns={2}
			columnWrapperStyle={styles.row}
			renderItem={({ item }) => (
				<RouteCard
					departureTime={item.departureTime}
					duration={item.duration}
					arrivalTime={item.arrivalTime}
					price={item.price}
					departureLocation={item.departureLocation}
					arrivalLocation={item.arrivalLocation}
					carrier={item.carrier}
					seatsAvailable={item.seatsAvailable}
					isPrintable={item.isPrintable}
					styleProp={styles.card}
				/>
			)}
		/>
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		padding: 10,
	},
	portrait: {
		paddingHorizontal: 20,
	},
	landscape: {
		paddingHorizontal: 40,
	},
	row: {
		flex: 1,
		justifyContent: "space-between",
	},
	card: {
		width: cardWidth,
		margin: 10,
	},
});