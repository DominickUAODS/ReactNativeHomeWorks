import React from "react";
import { Text, View, TouchableOpacity, FlatList, } from "react-native";
import { styles } from "../styles/styleBook";
import { genres } from "../data/genreData";

export default function GenreListScreen({ navigation }: any) {
	return (
		<View style={styles.container} >
			{/* <Text style={styles.header}> Genre list </Text> */}
			<FlatList
				data={genres}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity style={[styles.bookItem, { padding: 10, }]} onPress={() => navigation.navigate("Home", { genre: item.id })}>
						<Text style={styles.bookTitle}> {item.name} </Text>
					</TouchableOpacity>
				)} />
		</View >
	);
};