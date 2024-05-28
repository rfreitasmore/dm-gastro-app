import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/global";
import { useTheme } from "../context/ThemeContext";
import { signOut } from "../authConfig";

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
   fetchLoginStatus(); 
  }, []);

  const fetchLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(isLoggedIn === "true");
    } catch (error) {
      console.error("Error fetching login status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      await AsyncStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <View style={[globalStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[globalStyles.subTitle, { color: theme.text, fontWeight: "bold", position: "absolute", top: 100 }]}>Home Screen</Text>
      <Image
        source={require("../assets/_gastro_guide_app.png")}
        style={{ width: 300, resizeMode: "contain" }}
      />

      <Text style={{ color: theme.text }}>
        Bem vindo à aplicação de guia de restaurantes
      </Text>
     
          <TouchableOpacity
            style={[
              globalStyles.buttonStyle,
              { backgroundColor: theme.buttonBackground, width: 250, marginTop: 50 },
            ]}
            onPress={() => navigation.navigate("Mapa")}
          >
            <Text style={[globalStyles.text, { color: theme.text }]}>Entrar</Text>
          </TouchableOpacity>
          {isLoggedIn ? (
        <>
          <TouchableOpacity
            style={[
              globalStyles.buttonStyle,
              { backgroundColor: theme.secondary, width: 250, marginTop: 50 },
            ]}
            onPress={() => navigation.navigate("Registar")}
          >
            <Text style={[globalStyles.text, { color: theme.whiteBackgroundText }]}>Registar Restaurante</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.buttonStyle,
              { backgroundColor: theme.secondary, width: 250, marginTop: 50 },
            ]}
            onPress={() => navigation.navigate("Listar")}
          >
            <Text style={[globalStyles.text, { color: theme.whiteBackgroundText }]}>Listar Restaurantes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.buttonStyle,
              { backgroundColor: theme.secondary, width: 250, marginTop: 50 },
            ]}
            onPress={handleLogout}
          >
            <Text style={[globalStyles.text, { color: theme.whiteBackgroundText }]}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[
            globalStyles.buttonStyle,
            { backgroundColor: theme.secondary, width: 250, marginTop: 50 },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[globalStyles.text, { color: theme.whiteBackgroundText }]}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
