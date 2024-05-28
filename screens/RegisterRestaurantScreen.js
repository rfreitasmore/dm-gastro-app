import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { globalStyles, colors } from "../styles/global";
import { addRestaurant, fetchRestaurantById, updateRestaurant } from "../api/restaurants";
import SuccessModal from "../components/SuccessModal";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function RegisterRestaurantScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurant, setRestaurant] = useState({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
    category: "",
    imageUrl: "",
    rating: "",
    openingTimes: "",
    specialty: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchRestaurantDetails(id);
    }
  }, [id]);

  const fetchRestaurantDetails = async (id) => {
    try {
      const data = await fetchRestaurantById(id);
      setRestaurant(data);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setRestaurant({ ...restaurant, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await updateRestaurant(id, restaurant);
        setModalMessage("Restaurant updated successfully!");
      } else {
        await addRestaurant(restaurant);
        setModalMessage("Restaurant added successfully!");
      }
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving restaurant:", error);
      Alert.alert("Error", "Failed to save the restaurant.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={restaurant.name}
          onChangeText={(text) => handleInputChange("name", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Latitude"
          value={String(restaurant.latitude)}
          onChangeText={(text) => handleInputChange("latitude", text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Longitude"
          value={String(restaurant.longitude)}
          onChangeText={(text) => handleInputChange("longitude", text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Description"
          value={restaurant.description}
          onChangeText={(text) => handleInputChange("description", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={restaurant.category}
          onChangeText={(text) => handleInputChange("category", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Image URL"
          value={restaurant.imageUrl}
          onChangeText={(text) => handleInputChange("imageUrl", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Rating"
          value={String(restaurant.rating)}
          onChangeText={(text) => handleInputChange("rating", text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Opening Times"
          value={restaurant.openingTimes}
          onChangeText={(text) => handleInputChange("openingTimes", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Specialty"
          value={restaurant.specialty}
          onChangeText={(text) => handleInputChange("specialty", text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{isEditMode ? "Guardar Alterações" : "Registar"}</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message={isEditMode ? "Restaurant updated successfully!" : "Restaurant added successfully!"}
        iconName="check-circle"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
  },
  inputContainer: {
    margin: 20,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
