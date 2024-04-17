import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "./styles/global";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from "./screens/MapScreen";


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />   
        <Stack.Screen name="Mapa" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;