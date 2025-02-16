import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from "../styles/styles";

interface SearchFieldComp {
	placeholder: string;
}

const SearchFieldComp: React.FC<SearchFieldComp> = ({ placeholder }) => {
	return (
		<View style={styles.inputCont}>
			<TextInput style={styles.input} placeholder={placeholder} />
		</View>
	);
};

export default SearchFieldComp;