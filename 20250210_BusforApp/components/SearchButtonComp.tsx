import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from "../styles/styles";

export default function SearchButtonComp(): React.ReactElement {
	return (
		<TouchableOpacity style={styles.searchButton}>
			<Text style={styles.searchText}>Найти билет</Text>
		</TouchableOpacity>
	);
};