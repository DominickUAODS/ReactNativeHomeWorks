import { Text, View, TouchableOpacity, Image, ScrollView, } from "react-native";
import { styles } from "../styles/styleBook";
import { IGenre } from "../interfaces/IGenre";
import { genres } from "../data/genreData";

export default function BookDetailScreen({ route, navigation }: any) {
	const { book } = route.params;
	const genre: IGenre | undefined = genres.find((item) => item.id === book.genre);

	return (
		<ScrollView style={styles.container}>
			<Image source={book.imagePath} style={styles.image} />
			<Text style={[styles.bookTitle, { marginBottom: 10, }]}>{book.title} </Text>
			<TouchableOpacity style={styles.bookItem} onPress={() => navigation.navigate("AuthorDetail", { book })}>
				<Text style={styles.bookAuthorAdd}>{book.author} </Text>
			</TouchableOpacity>
			<Text style={styles.bookGenre}>{genre ? genre.name : "Неизвестный жанр"}</Text>
			<Text style={styles.bookDescription}>{book.description} </Text>
		</ScrollView>
	);
};