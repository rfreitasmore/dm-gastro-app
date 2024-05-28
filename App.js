import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "./styles/global";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from "./screens/MapScreen";
import RestaurantDetailsScreen from "./screens/RestaurantDetailsScreen";
import RegisterRestaurantScreen from "./screens/RegisterRestaurantScreen";
import RestaurantListScreen from "./screens/RestaurantListScreen";
import { ThemeProvider } from "./context/ThemeContext";
import ToggleTheme from "./components/ToggleTheme";

import LoginScreen from "./screens/LoginScreen";
import UserRegisterScreen from "./screens/UserRegisterScreen";


const Stack = createNativeStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerRight: () => <ToggleTheme />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Register" component={UserRegisterScreen} />
          <Stack.Screen name="Mapa" component={MapScreen} />
          <Stack.Screen name="Detalhes" component={RestaurantDetailsScreen} />
          <Stack.Screen name="Registar" component={RegisterRestaurantScreen} />
          <Stack.Screen name="Listar" component={RestaurantListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
