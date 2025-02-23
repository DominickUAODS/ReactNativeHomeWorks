import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, SafeAreaView, Alert, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome6"; // icons
import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import "react-native-get-random-values"; //Додаємо залежність для генерації випадкових значень
import { v4 as uuidv4 } from "uuid";
import IBook from "./interfaces/IBook";
import IUser from "./interfaces/IUser";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

let db: SQLite.SQLiteDatabase | null = null;

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
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [books, setBooks] = useState<IBook[]>([]);
	const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

	useEffect(() => {
		openDatabase();
	}, []);

	// Підключаємось до БД асінхронно
	const openDatabase = async () => {
		db = await SQLite.openDatabaseAsync("books.db");
		console.log("✅ База даных открыта");
		createTable();
		createUserTable();
		fetchBooks();
	};

	// Створюємо таблицю
	const createTable = async () => {
		if (!db) return;
		await db.execAsync(`
		  CREATE TABLE IF NOT EXISTS books (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			author TEXT NOT NULL
		  );
		`);
		console.log("✅ Таблиця книг создана");
	};

	// Створюємо таблицю пользвателей
	const createUserTable = async () => {
		if (!db) return;
		await db.execAsync(`
			CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY,
				username TEXT UNIQUE NOT NULL,
				password TEXT NOT NULL,
				salt TEXT NOT NULL
			);
		`);
		console.log("✅ Таблица пользователей создана");
	};

	const hashPassword = async (password: string, salt: string) => {
		return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, password + salt);
	};

	// Отримаємо книги
	const fetchBooks = async () => {
		if (!db) return;
		const result = await db.getAllAsync<IBook>("SELECT * FROM books;");
		setBooks(result);
	};

	// Додаэмо книгу
	const addBook = async () => {
		if (!db) {
			console.error("❌ Помилка при з'єднанні до БД!");
			return;
		}

		if (!title || !author) {
			Alert.alert("Помилка", "Введіть назву та автора");
			return;
		}

		const id = uuidv4();
		try {
			await db.runAsync(
				"INSERT INTO books (id, title, author) VALUES (?, ?, ?);",
				[id, title, author]
			);
			setTitle("");
			setAuthor("");
			await fetchBooks();
			console.log("✅ Книга додана");
		} catch (error) {
			console.error("❌ Помилка при додаванні книги:", error);
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

			if (!db) {
				Alert.alert("Ошибка", "База данных недоступна");
				return;
			}

			const users = await db.getAllAsync<IUser>(
				"SELECT * FROM users WHERE username = ?;",
				[username]
			);

			if (users.length > 0) {
				Alert.alert("Ошибка", "Пользователь уже существует!");
				return;
			}

			const id = uuidv4();
			const salt = uuidv4(); // Генерация соли
			const hashedPassword = await hashPassword(password, salt);

			await db.runAsync(
				"INSERT INTO users (id, username, password, salt) VALUES (?, ?, ?, ?);",
				[id, username, hashedPassword, salt]
			);

			Alert.alert("Успех", "Регистрация прошла успешно!");
		} catch (error) {
			console.error("Ошибка при регистрации:", error);
		}
	};

	// Видаляємо книгу
	const deleteBook = async (id: string) => {
		if (!db) return;
		await db.runAsync("DELETE FROM books WHERE id = ?;", [id]);
		await fetchBooks();
	};

	const handleLogin = async () => {
		try {
			if (!username || !password) {
				Alert.alert("Ошибка", "Введите логин и пароль!");
				return;
			}

			if (!db) {
				Alert.alert("Ошибка", "База данных недоступна");
				return;
			}

			const users = await db.getAllAsync<IUser>("SELECT * FROM users WHERE username = ?;", [username]);

			if (users.length === 0) {
				Alert.alert("Ошибка", "Неверный логин или пароль!");
				return;
			}

			const user = users[0];
			const hashedInputPassword = await hashPassword(password, user.salt);

			if (hashedInputPassword !== user.password) {
				Alert.alert("Ошибка", "Неверный логин или пароль!");
				return;
			}

			setIsLoggedIn(true);
			await AsyncStorage.setItem("isLoggedIn", "true");
			Alert.alert("Успех", "Вы вошли в систему!");

		} catch (error) {
			console.error("Ошибка при входе:", error);
		}
	};

	const handleLogout = async () => {
		setIsLoggedIn(false);
		await AsyncStorage.removeItem("isLoggedIn");
	};

	const handleClearBook = async () => {
		if (!db) return;
		setBooks([]);
		await db.runAsync("DELETE FROM books;");
		console.error('✅ Books cleared');
	};

	const handleClearData = async () => {
		try {
			if (!db) return;
			setBooks([]);
			await db.runAsync("DELETE FROM books;");
			await db.runAsync("DELETE FROM users;");
			await AsyncStorage.clear();
			setIsLoggedIn(false);
			console.log('✅ All Data Cleared');
		} catch (error) {
			console.error('Clening error:', error);
		}
	};

	// Оновлюємо книгу
	const updateBook = async () => {
		if (!db || !selectedBook) return;

		if (!title || !author) {
			Alert.alert("Помилка", "Введіть нову назву та автора");
			return;
		}

		try {
			await db.runAsync(
				"UPDATE books SET title = ?, author = ? WHERE id = ?;",
				[title, author, selectedBook.id]
			);
			setSelectedBook(null);
			setTitle("");
			setAuthor("");
			await fetchBooks();
		} catch (error) {
			console.error("❌ Помилка при редагуванні книги:", error);
		}
	};

	// Обираємо книгу для редагування
	const selectBookToEdit = (book: IBook) => {
		setSelectedBook(book);
		setTitle(book.title);
		setAuthor(book.author);
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
			<Tab.Screen name="Books" options={{ tabBarIcon: () => <Icon name="book" size={20} />, headerShown: false }} >
				{() => (
					<SafeAreaView style={{ flex: 1, padding: 20 }}>
						<Text style={{ fontSize: 24, fontWeight: "bold", }}>Book List</Text>
						<FlatList
							ListEmptyComponent={<Text>List is empty</Text>}
							data={books}
							keyExtractor={(item) => item.id}
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
										<Button title="✏️" onPress={() => selectBookToEdit(item)} />
										<Button title="🗑️" onPress={() => deleteBook(item.id)} />
									</View>
								</View>
							)}
						/>
						<TextInput
							placeholder="Book Title"
							value={title}
							onChangeText={setTitle}
							style={{ borderBottomWidth: 1, marginBottom: 10 }}
						/>
						<TextInput
							placeholder="Author"
							value={author}
							onChangeText={setAuthor}
							style={{ borderBottomWidth: 1, marginBottom: 20 }}
						/>
						<View >
							<Button
								title={selectedBook ? "Update book" : "Add book"}
								onPress={selectedBook ? updateBook : addBook}
							/>
							<Button title="Logout" onPress={handleLogout} />
						</View>
					</SafeAreaView>
				)}
			</Tab.Screen>
			<Tab.Screen name="Settings" options={{ tabBarIcon: () => <Icon name="gear" size={20} />, headerShown: false }} >
				{() => (
					<SafeAreaView style={{ flex: 1, padding: 20 }}>
						<Text style={{ fontSize: 24, fontWeight: "bold", }}>Settings</Text>
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