import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "../styles/styles";

export default function PromoBannerComp(): React.ReactElement {
	return (
		<View style={styles.banner}>
			<Text style={styles.bannerTitle}>Busfor теперь BlaBlaCar</Text>
			<Text style={styles.bannerSubtitle}>Те же автобусные рейсы по лучшей цене</Text>
			<TouchableOpacity style={styles.bannerButton}>
				<Text style={styles.buttonText}>Покупай безопасно на BlaBlaCar</Text>
			</TouchableOpacity>
		</View>
	);
};