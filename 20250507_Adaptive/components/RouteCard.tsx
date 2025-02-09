import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface RouteCardProps {
	styleProp?: StyleProp<ViewStyle>;
	departureTime: string;
	duration: string;
	arrivalTime: string;
	price: string;
	departureLocation: string;
	arrivalLocation: string;
	carrier: string;
	seatsAvailable: number;
	isPrintable: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ styleProp, departureTime, duration, arrivalTime, price, departureLocation, arrivalLocation, carrier, seatsAvailable, isPrintable, }) => {
	return (
		<View style={[styles.card, styleProp]}>
			<View style={styles.row}>
				<View style={[styles.column, styles.topRow]}>
					{!isPrintable && (
						<View style={styles.nonPrintable}>
							<Text style={styles.nonPrintableText}>Можна не роздруковувати</Text>
						</View>
					)}

				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.left]}>
					<Text style={styles.carrier}>{carrier}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={[styles.left, styles.inline]}>
					<Text style={styles.time}>{departureTime}</Text>
					<Text style={styles.duration}>{duration}</Text>
				</View>
				<View style={styles.right}>
					<Text style={styles.time}>{arrivalTime}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.left}>
					<Text style={styles.location}>{departureLocation}</Text>
				</View>
				<View style={styles.right}>
					<Text style={styles.location}>{arrivalLocation}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.left}>
					<Text style={styles.seats}>{seatsAvailable} місць</Text>
				</View>
				<View style={[styles.right, styles.centered,]}>
					<Text style={styles.price}>{price} грн</Text>
				</View>
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 15,
		marginVertical: 10,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#FE8205",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		alignSelf: "center",
	},
	topRow: {
		marginLeft: -15,
		marginTop: -15,
	},
	row: {
		flexDirection: "row",
	},
	column: {
		flexDirection: "column",
	},
	left: {
		width: "50%",
		flexDirection: "column",
	},
	right: {
		width: "50%",
		flexDirection: "column",
	},
	nonPrintable: {
		backgroundColor: "#ff9800",
		padding: 5,
		borderRadius: 4,
		marginBottom: 8,
	},
	nonPrintableText: {
		color: "#fff",
		fontSize: 12,
		textAlign: "center",
	},
	carrier: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 10,
	},
	timeRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	time: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
	duration: {
		fontSize: 12,
		color: "#888",
	},
	location: {
		fontSize: 12,
		color: "#555",
		marginBottom: 10,
	},
	seats: {
		fontSize: 14,
		color: "#888",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
	},
	inline: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "nowrap",
	},
	centered: {
		borderTopLeftRadius: 8,
		borderBottomRightRadius: 8,
		alignSelf: "center",
		alignItems: "center",
		backgroundColor: "#F9253E",

		//marginBottom: -25,

		marginRight: -15,
	},
});

export default RouteCard;