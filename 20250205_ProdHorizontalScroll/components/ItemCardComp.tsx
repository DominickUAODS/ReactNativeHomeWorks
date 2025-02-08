import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

interface ItemCardCompType {
	item: {
		id: string;
		name: string;
		price: number;
		image: string;
	}
};

export default function ItemCardComp({ item, isDarkMode = false }: ItemCardCompType & { isDarkMode?: boolean }): React.ReactElement {
	return (
		<View style={[styles.card, { backgroundColor: isDarkMode ? "#221B15" : "#fff", shadowColor: isDarkMode ? "#222" : "#aaa" }]}>
			<Image source={{ uri: item.image }} style={styles.image} />
			<View style={styles.itemname}>
				<Text style={[styles.name, { color: isDarkMode ? "#fff" : "#000" }]}>{item.name}</Text>
			</View>
			<Text style={[styles.price, { color: isDarkMode ? "#ddd" : "#333" }]}>{item.price} ₴</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 180,
		padding: 10,
		borderRadius: 8,
		marginVertical: 10,
		marginHorizontal: 10,
		elevation: 4,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		alignItems: "center",
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 8,
		marginBottom: 20,
	},
	itemname: {
		justifyContent: "center",
		height: 60,
		marginBottom: 20,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
	},
	price: {
		fontSize: 14,
		fontWeight: "bold",
	},
});