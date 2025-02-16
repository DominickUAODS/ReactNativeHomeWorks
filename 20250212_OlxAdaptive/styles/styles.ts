import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		margin: 5,
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	image: {
		flex: 5,
		width: "100%",
		height: 120,
		borderRadius: 10,
	},
	infoContainer: {
		flex: 3,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		paddingVertical: 5,
	},
	title: {
		fontWeight: "bold",
		flex: 1,
		alignSelf: "flex-start",
		paddingRight: 20,
	},
	status: {
		flex: 1,
		fontSize: 10,
		color: "#999",
		alignSelf: "flex-start",
	},
	favoriteButton: {
		padding: 5,
	},
	price: {
		flex: 1,
		color: "green",
		fontWeight: "bold",
		alignSelf: "flex-start",
	},
	city: {
		flex: 1,
		fontSize: 12,
		color: "#555",
		alignSelf: "flex-start",
	},
	datetime: {
		flex: 1,
		fontSize: 10,
		color: "#999",
		alignSelf: "flex-start",
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#f5f5f5",
	},
	listContainer: {
		alignItems: "flex-start",
	},
	portrait: {
		paddingHorizontal: 20,
	},
	landscape: {
		paddingHorizontal: 40,
	},
	row: {
		//flex: 1,
		justifyContent: "flex-start",
	},
});

