import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BookScreen from "./screen/BookScreen";
import BookDetailScreen from "./screen/BookDetailScreen";
import AuthorDetailScreen from "./screen/AuthorDetailScreen";
import GenreListScreen from "./screen/GenreListScreen";
import AuthorListScreen from "./screen/AuthorListScreen";

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Books" options={{ title: "All Books" }} component={BookScreen} />
			<Stack.Screen name="Detail" options={{ title: "Detail Book Info" }} component={BookDetailScreen} />
			<Stack.Screen name="AuthorDetail" options={{ title: "Author Details" }} component={AuthorDetailScreen} />
			<Stack.Screen name="GenreList" options={{ title: "Genre List" }} component={GenreListScreen} />
			<Stack.Screen name="AuthorList" options={{ title: "Author List" }} component={AuthorListScreen} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" options={{ title: "Home", }} component={HomeStack} />
				<Drawer.Screen name="Author" component={AuthorListScreen} />
				<Drawer.Screen name="Gernes" component={GenreListScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};