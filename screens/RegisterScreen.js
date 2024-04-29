import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors, fonts, cardShadow, globalStyles } from "../styles/global";

export default function RegisterScreen() {
  return (
    <View style={globalStyles.container}>
      <Text
        style={[
          globalStyles.subTitle,
          {
            color: colors.text,
            fontWeight: "bold",
            position: "absolute",
            top: 100,
          },
        ]}
      >
        {" "}
        Registo{" "}
      </Text>
    </View>
  );
}
