import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "../styles/styleBook";
import { books } from "../data/bookData";
import { genres } from "../data/genreData";

function getGenreName(genreId: string): string {
	const genre = genres.find((g) => g.id === genreId);
	return genre ? genre.name : "Неизвестный жанр";
}

export default function HomeScreen({ navigation, route }: any) {
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

	useEffect(() => { if (route.params?.genre) { setSelectedGenre(route.params.genre); } }, [route.params?.genre]);

	const filteredBooks = selectedGenre
		? books.filter((book) => book.genre === selectedGenre)
		: books;

	return (
		<View style={styles.container} >
			{/* <Text style={styles.header}> Books list </Text> */}
			<TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate("GenreList")}>
				<Text style={styles.genreButtonText}>Выберите жанр</Text>
			</TouchableOpacity>

			<FlatList
				data={filteredBooks}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.bookItem} onPress={() => navigation.navigate("Detail", { book: item })}>
						<Image source={item.imagePath} style={styles.bookImage} />
						<View style={styles.bookDetails}>
							<Text style={styles.bookTitle}>{item.title}</Text>
							<Text style={styles.bookAuthor}>{item.author}</Text>
							<Text style={styles.bookGenre}>{getGenreName(item.genre)}</Text>
						</View>
					</TouchableOpacity>
				)} />
		</View >
	);
};