import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { globalStyles } from "../styles/global";
import { addRestaurants } from "../api/restaurantsBatch";
import { useTheme } from "../context/ThemeContext"; 

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("HomeScreen mounted");
    console.log("Theme:", theme);
  }, []);

  const handleAddRestaurants = async () => {
    try {
      await addRestaurants();
      alert('Restaurants added successfully!');
    } catch (error) {
      console.error('Failed to add restaurants:', error);
      alert('Failed to add restaurants.');
    }
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Text
        style={[
          globalStyles.subTitle,
          {
            color: theme.text,
            fontWeight: "bold",
            position: "absolute",
            top: 100,
          },
        ]}
      >
        Home Screen
      </Text>

      <Image
        source={require("../assets/_gastro_guide_app.png")}
        style={{ width: 300, resizeMode: "contain" }}
      />

      <Text style={{ color: theme.text }}>
        Bem vindo à aplicação de guia de restaurantes
      </Text>
      <StatusBar style="auto" />

      <TouchableOpacity
        style={[
          globalStyles.buttonStyle,
          {
            backgroundColor: theme.buttonBackground,
            width: 250,
            marginTop: 50,
          },
        ]}
        onPress={() => {
          navigation.navigate("Mapa");
        }}
      >
        <Text style={[globalStyles.text, { color: theme.text }]}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          globalStyles.buttonStyle,
          {
            backgroundColor: theme.secondary,
            width: 250,
            marginTop: 50,
          },
        ]}
        onPress={() => 
          navigation.navigate("Registar") //handleAddRestaurants()
        }
      >
        <Text style={[globalStyles.text, { color: theme.whiteBackgroundText }]}>Registar Restaurante</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          globalStyles.buttonStyle,
          {
            backgroundColor: theme.secondary,
            width: 250,
            marginTop: 50,
          },
        ]}
        onPress={() => 
          navigation.navigate("Listar") //handleAddRestaurants()
        }
      >
        <Text style={[globalStyles.text, { color: theme.whiteBackgroundText }]}>Listar Restaurantes</Text>
      </TouchableOpacity>
    </View>
  );
}
