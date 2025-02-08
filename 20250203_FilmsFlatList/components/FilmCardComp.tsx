import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";


interface FilmCardCompType {
	film: {
		id: string;
		title: string;
		year: string;
		image: string;
	}
}

export default function FilmCardComp({ film }: FilmCardCompType): React.ReactElement {
	return (
		<View style={styles.card}>
			<Image source={{ uri: film.image }} style={styles.image} />
			<View style={styles.details}>
				<Text style={styles.title}>{film.title}</Text>
				<Text style={styles.year}>{film.year}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		marginVertical: 8,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginRight: 10,
	},
	details: {
		justifyContent: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 5,
	},
	year: {
		fontSize: 14,
		color: "#666",
	},
});