import { Text, View, } from "react-native";
import { styles } from "../styles/styleBook";

export default function AuthorDetailScreen({ route }: any) {
    const { book } = route.params;

    return (
        <View style={styles.container}>
            <Text style={[styles.bookAuthorAdd, { marginBottom: 15, }]}>{book.author} </Text>
            <Text style={styles.bookAuthorAdd}>{book.authorInfo} </Text>
        </View>
    )
}