import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
	header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
	mainBtn: { flexDirection: "row", justifyContent: "space-between", },
	bookItem: { flexDirection: "row", paddingTop: 10, paddingBottom: 10, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8, alignItems: 'flex-start', },
	bookImage: { width: 50, height: 75, marginRight: 10, borderRadius: 5, },
	bookDetails: { flex: 1, justifyContent: "center", },
	bookTitle: { fontSize: 18, fontWeight: "bold" },
	bookAuthor: { fontSize: 14, color: "gray" },
	bookAuthorAdd: { fontSize: 16, color: "black" },
	bookDescription: { fontSize: 16, marginTop: 10 },
	genreButton: { padding: 15, backgroundColor: "gray", borderRadius: 8, marginBottom: 15, width: "48%", },
	genreButtonText: { fontSize: 16, color: "#fff", textAlign: "center", },
	bookGenre: { fontSize: 14, color: "blue" },
	image: { width: 200, height: 300, marginBottom: 20, },
});