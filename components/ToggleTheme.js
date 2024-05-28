import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { lightTheme, useTheme } from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.switchContainer,
        { backgroundColor: theme === lightTheme ? "#fff" : "#000" },
      ]}
    >
      <Text
        style={{ fontSize: 10, color: theme === lightTheme ? "#000" : "#fff" }}
      >
        {theme === lightTheme ? "Light Mode" : "Dark Mode "}
      </Text>
      <Icon
        name={theme === lightTheme ? "sun-o" : "moon-o"}
        size={20}
        color={theme === lightTheme ? "#000" : "#fff"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 95,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "black",
  },
});
