import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { globalStyles, colors } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { fetchRestaurants, deleteRestaurant } from "../api/restaurants"; 
import SuccessModal from "../components/SuccessModal";

export default function RestaurantListScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await fetchRestaurants();
      console.log("Fetched restaurants:", data[0]);
      setRestaurants(data);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
    setLoading(false);
  };

  const handleEditPress = (id) => {
    navigation.navigate("Registar", { id });
  };

  const handleDeletePress = async (id) => {
    console.log("Deleting restaurant with id:", id);
    try {
      await deleteRestaurant(id);
      setModalMessage("Restaurant deleted successfully!");
      setModalVisible(true);
      setSelectedId(null); 
      loadRestaurants();
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
      setModalMessage(`Failed to delete restaurant: ${error.message || error}`);
      setModalVisible(true);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => setSelectedId(null)}
        onLongPress={() => setSelectedId(item.id)}
        style={styles.infoContainer}
      >
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.details}>{item.description}</Text>
        <Text
          style={styles.details}
        >{`Rating: ${item.rating} | Category: ${item.category}`}</Text>
      </TouchableOpacity>
      {selectedId === item.id && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => handleEditPress(item.id)}
            color="#4CAF50"
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => handleDeletePress(item.id)}
            color="#F44336"
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
          <SuccessModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            message={modalMessage}
            iconName="check-circle"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    marginTop: 10,
  },
  button: {
    width: "50%",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
  details: {
    fontSize: 14,
  },
});
