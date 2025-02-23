import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, SafeAreaView, Alert, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome6"; // icons

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="About" component={AboutScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

const HomeScreen = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [books, setBooks] = useState<{ title: string; author: string }[]>([]);
	const [newBook, setNewBook] = useState<{ title: string; author: string }>({
		title: "",
		author: "",
	});

	useEffect(() => {
		const loadBooks = async () => {
			const storedBooks = await AsyncStorage.getItem("books");
			if (storedBooks) {
				setBooks(JSON.parse(storedBooks));
			}
		};
		loadBooks();
	}, []);

	const handleLogin = async () => {
		try {
			if (!username || !password) {
				Alert.alert("Ошибка", "Введите логин и пароль!");
				return;
			}

			const storedUsers = await AsyncStorage.getItem("users");
			const users = storedUsers ? JSON.parse(storedUsers) : [];

			const user = users.find((user: any) => user.username === username && user.password === password);

			if (user) {
				setIsLoggedIn(true);
				await AsyncStorage.setItem("isLoggedIn", "true");
				Alert.alert("Успех", "Вы вошли в систему!");
			} else {
				Alert.alert("Ошибка", "Неверные данные для входа!");
			}
		} catch (error) {
			console.error("Ошибка при входе:", error);
		}
	};

	const handleSignUp = async () => {
		try {
			if (!username || !password || !password2) {
				Alert.alert("Ошибка", "Заполните все поля!");
				return;
			}

			if (password !== password2) {
				Alert.alert("Ошибка", "Пароли не совпадают!");
				return;
			}

			const storedUsers = await AsyncStorage.getItem("users");
			const users = storedUsers ? JSON.parse(storedUsers) : [];

			const userExists = users.some((user: any) => user.username === username);
			if (userExists) {
				Alert.alert("Ошибка", "Пользователь с таким именем уже существует!");
				return;
			}

			const newUser = { username, password };
			const updatedUsers = [...users, newUser];

			await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

			Alert.alert("Успех", "Регистрация прошла успешно!");
		} catch (error) {
			console.error("Ошибка при регистрации:", error);
		}
	};

	const handleLogout = async () => {
		setIsLoggedIn(false);
		await AsyncStorage.removeItem("isLoggedIn");
	};

	const handleAddBook = async () => {
		if (newBook.title && newBook.author) {
			const updatedBooks = [...books, newBook];
			setBooks(updatedBooks);
			await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
			setNewBook({ title: "", author: "" });
		}
	};

	const handleDeleteBook = async (book: { title: string; author: string }) => {
		const updatedBooks = books.filter((b) => b !== book);
		setBooks(updatedBooks);
		await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
	};

	const handleClearBook = async () => {
		setBooks([]);
		await AsyncStorage.removeItem("books");
		console.error('Books cleared');
	};

	const handleClearData = async () => {
		try {
			setBooks([]);
			await AsyncStorage.clear();
			setIsLoggedIn(false);
			console.log('Async Storage Cleared');
		} catch (error) {
			console.error('Clening error:', error);
		}
	};

	if (!isLoggedIn) {
		return (
			<Tab.Navigator>
				{/*SignIn*/}
				<Tab.Screen name="SignIn" options={{ title: "Sign In", tabBarIcon: () => <Icon name="right-to-bracket" size={20} />, headerShown: false }}>{() =>
				(
					<SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 20 }}>
						{/* <Text>Login</Text> */}
						<TextInput
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
							style={{ borderBottomWidth: 1, marginBottom: 10 }}
						/>
						<TextInput
							placeholder="Password"
							secureTextEntry
							value={password}
							onChangeText={setPassword}
							style={{ borderBottomWidth: 1, marginBottom: 20 }}
						/>
						<Button title="Login" onPress={handleLogin} />
					</SafeAreaView>
				)}
				</Tab.Screen>
				{/*SignUp*/}
				<Tab.Screen name="SignUp" options={{ title: "Sign Up", tabBarIcon: () => <Icon name="user-plus" size={20} />, headerShown: false }}>{() => (
					<SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 20 }}>
						<TextInput
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
							style={{ borderBottomWidth: 1, marginBottom: 10 }}
						/>
						<TextInput
							placeholder="Password"
							secureTextEntry
							value={password}
							onChangeText={setPassword}
							style={{ borderBottomWidth: 1, marginBottom: 10 }}
						/>
						<TextInput
							placeholder="Confirm Password"
							secureTextEntry
							value={password2}
							onChangeText={setPassword2}
							style={{ borderBottomWidth: 1, marginBottom: 20 }}
						/>
						<Button title="Sign Up" onPress={handleSignUp} />
					</SafeAreaView>
				)}
				</Tab.Screen>
			</Tab.Navigator >
		);
	};

	return (
		<Tab.Navigator>
			<Tab.Screen name="Books" options={{ tabBarIcon: () => <Icon name="book" size={20} />, }} >
				{() => (
					<SafeAreaView style={{ flex: 1, padding: 20 }}>
						<Text>Book List</Text>
						<FlatList
							ListEmptyComponent={<Text>List is empty</Text>}
							data={books}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginBottom: 10,
									}}
								>
									<Text>
										{item.title} by {item.author}
									</Text>
									<View style={{ flexDirection: "row" }}>
										<Button
											title="Delete"
											onPress={() => handleDeleteBook(item)}
										/>
									</View>
								</View>
							)}
						/>
						<TextInput
							placeholder="Book Title"
							value={newBook.title}
							onChangeText={(text) => setNewBook({ ...newBook, title: text })}
							style={{ borderBottomWidth: 1, marginBottom: 10 }}
						/>
						<TextInput
							placeholder="Author"
							value={newBook.author}
							onChangeText={(text) => setNewBook({ ...newBook, author: text })}
							style={{ borderBottomWidth: 1, marginBottom: 20 }}
						/>
						<View >
							<Button title="Add Book" onPress={handleAddBook} />
							<Button title="Logout" onPress={handleLogout} />
						</View>
					</SafeAreaView>
				)}
			</Tab.Screen>
			<Tab.Screen name="Settings" options={{ tabBarIcon: () => <Icon name="gear" size={20} />, }} >
				{() => (
					<SafeAreaView style={{ flex: 1, padding: 20 }}>
						<Text>Settings</Text>
						<Text>Тут будуть налаштування</Text>
						<Button title="Clear All Data" onPress={handleClearData} />
						<Button title="Clear books" onPress={handleClearBook} />
					</SafeAreaView>
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

const AboutScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 20 }}>
			<Text>About the app</Text>
			<Text>This is a book management app with login functionality.</Text>
		</SafeAreaView>
	);
};

export default App;