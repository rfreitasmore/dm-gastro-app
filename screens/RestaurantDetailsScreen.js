import React, { useState, useEffect } from "react";
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
import restaurantData from "../data/restaurantData.js";

export default function RestaurantDetailsScreen({ navigation, route }) {
  const [restaurant, setRestaurant] = useState([]);
  console.log("Parametro passado do mapscreen", route.params);

  const { restaurantId } = route.params;

  useEffect(() => {
    fetchRestaurantById(restaurantId);
  }, []);

  const fetchRestaurantById = (id) => {
    const restaurant = restaurantData.find(
      (restaurant) => restaurant.id === id
    );
    setRestaurant(restaurant);
    console.log("Restaurant", restaurant);
  };

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
        Detalhes do restaurante{" "}
      </Text>

      <Image style={styles.modalImage} source={{ uri: restaurant?.imageUrl }} />

      <Text>{restaurant.name}</Text>
      <Text>{restaurant.specialty}</Text>
      <Text>{restaurant.rating}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    width: 150,
  },
  containerMap: {
    flex: 0.6,
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  containerFilters: {
    flex: 0.1,
    width: "100%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
  },
  filtersContentContainer: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "white",
  },
  containerList: {
    flex: 0.3,
    width: "100%",
  },
  scrollView: {
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.9,
    width: "90%",
    height: "70%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#43806c",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position: "absolute",
    bottom: 35,
    justifyContent: "center",
    backgroundColor: "#FFA500",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
