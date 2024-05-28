import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { signIn } from "../authConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredentials = await signIn(email, password);
      console.log(userCredentials);
      await AsyncStorage.setItem("isLoggedIn", "true");
      console.log("User logged in successfully.");
      navigation.navigate("Home");
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
    }
    setLoading(false);
  };
  

  const handleRegisterNavigation = () => {
    navigation.navigate("Register"); 
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.subTitle, { color: globalStyles.text, fontWeight: "bold", position: "absolute", top: 100 }]}>Login Screen</Text>
      <View style={globalStyles.inputContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Icon name="login" size={55} color={colors.secondary} />
        </View>
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={globalStyles.buttons.login} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 5}} onPress={handleRegisterNavigation}>
          <Text style={{color: "black", textAlign:"center" }}>Registar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.secondary }}>{error} </Text>
      </View>
    </View>
  );
}
