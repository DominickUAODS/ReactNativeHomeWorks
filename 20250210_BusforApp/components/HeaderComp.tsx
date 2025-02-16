import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from "../styles/styles";
const mainLogo = require("../assets/mainLogo.svg");

export default function HeaderComp(): React.ReactElement {
	return (
		<View style={styles.header}>
			<Image source={mainLogo} style={styles.logo} />
			<Text style={styles.title}>BUSFOR</Text>
		</View>
	);
};