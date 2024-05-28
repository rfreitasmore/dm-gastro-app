import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "../styles/global";
import Icon from "react-native-vector-icons/AntDesign";
import { register } from "../authConfig";

export default function UserRegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(email, password);
      navigation.navigate("Login");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <View style={globalStyles.container}>
      <Icon name="user" size={55} color={colors.secondary} />
      <Text style={{ color: "black", marginBottom: 20 }}>Registar utilizador</Text>

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
      <TouchableOpacity
        style={globalStyles.buttons.register}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={globalStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
