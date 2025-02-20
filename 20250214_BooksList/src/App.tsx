import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import BookDetailScreen from "./screen/BookDetailScreen";
import AuthorDetailScreen from "./screen/AuthorDetailScreen";
import GenreListScreen from "./screen/GenreListScreen";

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" options={{ title: "All Books" }} component={HomeScreen} />
				<Stack.Screen name="Detail" options={{ title: "Detail Book Info" }} component={BookDetailScreen} />
				<Stack.Screen name="AuthorDetail" options={{ title: "Author Details" }} component={AuthorDetailScreen} />
				<Stack.Screen name="GenreList" options={{ title: "Genre List" }} component={GenreListScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};