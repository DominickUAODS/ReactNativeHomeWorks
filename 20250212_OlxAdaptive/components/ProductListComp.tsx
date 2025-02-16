import React, { useState, useEffect } from "react";
import { FlatList, View, Dimensions, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ProductCardComp from "./ProductCardComp";
import { styles } from "../styles/styles"

const products = [
	{ id: "1", title: "Гибридный инвертор Must 5.5", price: "15 120 грн.", status:"Новое", city: "Одеса", datetime: "Сегодня в 09:11", image: require("../assets/inverter.webp") },
	{ id: "2", title: "Электропривод для швейной машинки", price: "450 грн.", status:"Новое", city: "Одеса", datetime: "Вчера в 13:02", image: require("../assets/motor.webp") },
	{ id: "3", title: "Samsung S7 4/32 gb", price: "1 700 грн.", status:"Б/у", city: "Одеса", datetime: "Вчера в 18:58", image: require("../assets/phone.jpg") },
	{ id: "4", title: "Кебаб слайсер нож для шаурмы", price: "4 000 грн.", status:"Б/у", city: "Одеса", datetime: "7 лютого 2025", image: require("../assets/slicer.webp") },
	{ id: "5", title: "Гибридный инвертор Must 5.522", price: "15 120 грн.", status:"Новое", city: "Одеса", datetime: "Сегодня в 09:11", image: require("../assets/inverter.webp") },
	{ id: "6", title: "Электропривод для швейной машинки нов", price: "450 грн.", status:"Новое", city: "Одеса", datetime: "Вчера в 13:02", image: require("../assets/motor.webp") },
	{ id: "7", title: "Samsung S7 4/32 gb б/у", price: "1 700 грн.", status:"Б/у", city: "Одеса", datetime: "Вчера в 18:58", image: require("../assets/phone.jpg") },
	{ id: "8", title: "Кебаб слайсер нож для шаурмы", price: "4 000 грн.", status:"Б/у", city: "Одеса", datetime: "7 лютого 2025", image: require("../assets/slicer.webp") },
];

export default function ProductListComp(): React.ReactElement {
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

	const screenWidth = Dimensions.get("window").width;
	
	let numColumns = isPortrait ? (screenWidth < 500 ? 2 : 3) : (screenWidth < 900 ? 3 : 4);

	let cardWidth = screenWidth / numColumns - 40;

	// console.log(`screenWidth = ${screenWidth}`)
	// console.log(Dimensions.get("window").height)
	// console.log(Dimensions.get("window").width)
	// console.log(`isPortrait = ${isPortrait}`)
	// console.log(`numColumns = ${numColumns}`)

	return (
		<SafeAreaProvider>
			<SafeAreaView style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
				{isPortrait ? (
					<PortraitView numColumns={numColumns} cardWidth={cardWidth} />
				) : (
					<LandscapeView numColumns={numColumns} cardWidth={cardWidth} />
				)}
				<StatusBar backgroundColor="#18ABA6" />
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const PortraitView = ({ numColumns, cardWidth }: { numColumns: number; cardWidth: number }) => (
	<View style={styles.container}>
		<FlatList
			data={products}
			keyExtractor={(item) => item.id}
			numColumns={numColumns}
			renderItem={({ item }) => <ProductCardComp product={item} cardWidth={cardWidth} />}
			contentContainerStyle={styles.listContainer}
		/>
	</View>
)

const LandscapeView = ({ numColumns, cardWidth }: { numColumns: number; cardWidth: number }) => (
	<View style={styles.container}>
		<FlatList
			data={products}
			keyExtractor={(item) => item.id}
			horizontal={false}
			numColumns={numColumns}
			columnWrapperStyle={styles.row}
			renderItem={({ item }) => <ProductCardComp product={item} cardWidth={cardWidth} />}
			contentContainerStyle={[styles.listContainer]}
		/>
	</View>
)