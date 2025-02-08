import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Text } from "react-native";


interface FilmFormCompType {
	onAddFilm: (film: { title: string; year: string; image: string }) => void;
}

export default function FilmFormComp({ onAddFilm }: FilmFormCompType,): React.ReactElement {

	const [title, setTitle] = useState<string>("");
	const [year, setYear] = useState<string>("");
	const [image, setImage] = useState<string>("");

	const handleAddFilm = () => {

		if (title && year && image) {
			onAddFilm({ title, year, image });
			setTitle("");
			setYear("");
			setImage("");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.textlLabel}>Film title</Text>
			<TextInput style={styles.input} placeholder="Enter film title" value={title} onChangeText={(title) => setTitle(title)} />
			<Text style={styles.textlLabel}>Film year</Text>
			<TextInput style={styles.input} placeholder="Enter film year" value={year} onChangeText={(year) => setYear(year)} keyboardType="numeric" maxLength={4} />
			<Text style={styles.textlLabel}>Image path</Text>
			<TextInput style={styles.input} placeholder="Enter image path" value={image} onChangeText={(image) => setImage(image)} />
			<Pressable style={styles.btn} onPress={handleAddFilm}><Text style={styles.btnTxt}>Add movie</Text></Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		marginTop: 10,
		marginBottom: 20,
		alignItems: "center",
		backgroundColor: "#f4f4f4",
	},
	textlLabel: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#333",
		alignSelf: "flex-start",
		marginLeft: "2.5%",
	},
	input: {
		borderWidth: 2,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 8,
		marginBottom: 10,
		backgroundColor: "#fff",
		width: "95%",
	},
	btn: {
		padding: 10,
		width: "30%",
		alignItems: "center",
		backgroundColor: "forestgreen",
		borderRadius: 5,
	},
	btnTxt: {
		fontSize: 14,
		color: "white",
		fontWeight: "bold",
	},
});