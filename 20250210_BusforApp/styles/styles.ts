import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	background: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
	containerPortrait: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	containerLandscape: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 20,
	},
	logo: {
		width: 70,
		height: 50,
		marginRight: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	banner: {
		backgroundColor: "lightblue",
		padding: 10,
		borderRadius: 5,
		marginVertical: 10,
		textAlign: "center",
		width: "90%",
	},
	bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
	bannerSubtitle: { color: '#fff' },
	bannerButton: { backgroundColor: '#fff', padding: 10, marginTop: 10, borderRadius: 5 },
	buttonText: { textAlign: 'center', color: '#00aaff', fontWeight: 'bold' },
	inputCont: {
		backgroundColor: "#ddd",
		width: "90%",
	},
	input: {
		width: "100%",
		padding: 10,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		marginVertical: 5,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
	},
	button: {
		padding: 10,
		backgroundColor: "#ddd",
		borderRadius: 5,
		marginVertical: 5,
		width: "50%",
	},
	searchButton: {
		backgroundColor: "red",
		padding: 15,
		borderRadius: 5,
		marginVertical: 20,
		width: "90%",
		alignItems: "center",
	},
	searchText: {
		color: "white",
		fontWeight: "bold",
	},
	footer: {
		position: 'absolute',
		left: 0,
		right: 0,
		backgroundColor: 'white',
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 60,
		borderTopWidth: 1,
		borderColor: '#ccc',
	},
	footerPortrait: {
		bottom: 20,
		width: '100%',
		alignItems: 'center',
		borderRadius: 10,
	},
	footerLandscape: {
		position: 'relative',
		width: '100%',
	},
});

