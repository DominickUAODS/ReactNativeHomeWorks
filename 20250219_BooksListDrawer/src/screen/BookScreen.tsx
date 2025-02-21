import React, { useState, useEffect, } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "../styles/styleBook";
import { books } from "../data/bookData";
import { genres } from "../data/genreData";

function getGenreName(genreId: string): string {
	const genre = genres.find((g) => g.id === genreId);
	return genre ? genre.name : "Неизвестный жанр";
}

export default function BookScreen({ navigation, route }: any) {
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

	useEffect(() => {
		if (route.params?.genre) {
			setSelectedGenre(route.params.genre);
		} else if (route.params?.author) {
			setSelectedAuthor(route.params.author)
		}
	}, [route.params]);

	let filteredBooks;
	if (selectedGenre) {
		filteredBooks = books.filter((book) => book.genre === selectedGenre);
	} else if (selectedAuthor) {
		filteredBooks = books.filter((book) => book.author === selectedAuthor);
	} else {
		filteredBooks = books;
	}

	return (
		<View style={styles.container} >
			{/* <Text style={styles.header}> Books list </Text> */}
			<View style={styles.mainBtn}>
				<TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate("GenreList")}>
					<Text style={styles.genreButtonText}>Выберите жанр</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.genreButton} onPress={() => navigation.navigate("AuthorList")}>
					<Text style={styles.genreButtonText}>Выберите автора</Text>
				</TouchableOpacity>
			</View>


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