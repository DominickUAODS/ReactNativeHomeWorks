import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Switch, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ItemCardComp from "./ItemCardComp";

interface Item {
	id: string;
	name: string;
	price: number;
	image: string;
};

export default function ItemListComp(): React.ReactElement {
	const items: Array<Item> = [
		{
			id: "1",
			name: "Xiaomi Robot Vacuum",
			price: 27599,
			image: "https://content.rozetka.com.ua/goods/images/big/479734512.webp",
		},
		{
			id: "2",
			name: "Xiaomi Redmi Note 14",
			price: 12999,
			image: "https://content2.rozetka.com.ua/goods/images/big/505427757.jpg",
		},
		{
			id: "3",
			name: "Apple iPhone 14",
			price: 27999,
			image: "https://content2.rozetka.com.ua/goods/images/big/284913536.jpg",
		},
		{
			id: "4",
			name: "Acer Predator Helios Neo 18 PHN18-71-90B2 ",
			price: 89999,
			image: "https://content2.rozetka.com.ua/goods/images/big/480589192.jpg",
		},

	]

	const [itemList, setItemList] = useState<Array<Item>>(items);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#333" : "#CAD5E4" }]}>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View style={styles.header}>
				<View style={styles.switchContainer}>
					<MaterialIcons name={isDarkMode ? "dark-mode" : "light-mode"} color={isDarkMode ? "#fff" : "#000"} />
					<Switch
						trackColor={{ false: "#767577", true: "#f4f3f4" }}
						thumbColor={isDarkMode ? "#767577" : "#f4f3f4"}
						onValueChange={toggleSwitch}
						value={isDarkMode}
					/>
				</View>
			</View>
			<View style={styles.flatview}>
				<FlatList
					data={itemList}
					renderItem={({ item }) => <ItemCardComp item={item} isDarkMode={isDarkMode} />}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.cardWrap}
					horizontal={true}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	flatview: {
		justifyContent: "flex-end",
		alignItems: "center",
	},
	cardWrap: {
		flexDirection: "row",
		gap: 20,
		paddingBottom: 20,
	}
});