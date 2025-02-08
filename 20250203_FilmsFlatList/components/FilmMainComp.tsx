import React, { useState } from "react";
import { View, FlatList, StyleSheet, Platform, StatusBar, ScrollView, VirtualizedList } from "react-native";
import FilmFormComp from "./FilmFormComp";
import FilmCardComp from "./FilmCardComp";

interface Film {
	id: string;
	title: string;
	year: string;
	image: string;
}

export default function FilmMainComp(): React.ReactElement {
	const films: Array<Film> = [
		{ id: "1", title: "Inception", year: "2010", image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
		{ id: "2", title: "Interstellar", year: "2014", image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
	]

	const [filmList, setFilmList] = useState<Film[]>(films);

	const addFilm = (newFilm: Omit<Film, "id">) => {
		setFilmList((prevFilm) => [
			...prevFilm,
			{ ...newFilm, id: Math.random().toString() },
		]);
	};

	return (
		<View style={styles.container}>
			<FilmFormComp onAddFilm={addFilm} />
			<FlatList
				data={filmList}
				renderItem={({ item }) => <FilmCardComp film={item} />}
				keyExtractor={(item) => item.id}
			/>
			<StatusBar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		backgroundColor: "#f8f8f8",
	},
});