import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, PixelRatio } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "../styles/styles"

export default function ProductCardComp({ product, cardWidth }: any): React.ReactElement {
	const [isFavorite, setIsFavorite] = useState(false);

	const toggleFavorite = () => setIsFavorite(!isFavorite);

	const fontSize = PixelRatio.getFontScale() * (cardWidth > 200 ? 18 : 14);

	return (
		<View style={[styles.card, { width: cardWidth }]}>
			<Image source={product.image} style={styles.image} />
			<View style={styles.infoContainer}>
				<Text style={[styles.title, { fontSize }]}>{product.title}</Text>
				<TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
					<FontAwesome name={isFavorite ? "heart" : "heart-o"} size={20} color={isFavorite ? "red" : "gray"} />
				</TouchableOpacity>
			</View>
			<Text style={styles.status}>{product.status}</Text>
			<Text style={[styles.price, { fontSize: fontSize * 1.1 }]}>{product.price}</Text>
			<Text style={styles.city}>{product.city}</Text>
			<Text style={styles.datetime}>{product.datetime}</Text>
		</View>
	);
};