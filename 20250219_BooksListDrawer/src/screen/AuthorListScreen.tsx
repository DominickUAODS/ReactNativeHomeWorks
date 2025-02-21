import React from "react";
import { Text, View, TouchableOpacity, FlatList, } from "react-native";
import { styles } from "../styles/styleBook";
import { books } from "../data/bookData";

export default function AuthorListScreen({ navigation }: any) {
	return (
		<View style={styles.container} >
			<FlatList
				data={books}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity style={[styles.bookItem, { padding: 10, }]} onPress={() => navigation.navigate("Books", { author: item.author })}>
						<Text style={styles.bookTitle}> {item.author} </Text>
					</TouchableOpacity>
				)} />
		</View >
	);
};