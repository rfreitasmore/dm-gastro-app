import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { globalStyles, colors } from "../styles/global";
import Map from "../components/Map";
import RestaurantModal from "../components/RestaurantModal";
import restaurantData from "../data/restaurantsData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const data = restaurantData;

const filterCategories = [
  "Todos",
  ...new Set(data.map((restaurante) => restaurante.category)),
];

//console.log(filterCategories);

const restauranteCategories = ["Todos", "Churrasqueira", "Petiscos"];

export default function MapScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredRestaurants = data.filter((restaurant) => {
    return restaurant.category === selectedFilter || selectedFilter === "Todos";
  });
  console.log(selectedFilter);

  const renderCategoryIcons = (category) => {
    switch (category) {
      case "Todos":
        return <MaterialIcons name="food-bank" size={24} color="black" />;

      case "Tradicional":
        return <MaterialIcons name="local-dining" size={24} color="black" />;
      case "Churrasqueira":
        return <MaterialIcons name="outdoor-grill" size={24} color="black" />;
      case "Petiscos":
        return <MaterialIcons name="restaurant" size={24} color="black" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <Map restaurantes={filteredRestaurants} navigation={navigation} />
      </View>
      <View style={styles.containerFilters}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {filterCategories.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.buttonStyle,
                { flexDirection: "row", alignItems: "center" },
                selectedFilter === filter
                  ? { backgroundColor: "red", color: "white" }
                  : null,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <View style={{ marginRight: 10 }}>
                {renderCategoryIcons(filter)}
              </View>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter ? { color: "white" } : null,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedRestaurant(item);
                setModalVisible(true);
              }}
              style={[
                globalStyles.card,
                {
                  backgroundColor: colors.primary,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text style={{ color: "white" }}>{item?.name}</Text>
              <Text style={{ color: "white" }}>{`${item.rating} ⭐`}</Text>
            </TouchableOpacity>
          )}
        />
        {/* <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonTextStyle}>Home</Text>
        </TouchableOpacity> */}
      </SafeAreaView>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedRestaurant?.name}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
      <RestaurantModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        restaurant={selectedRestaurant}
        navigation={navigation}
      />

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
  selectedButton: {
    backgroundColor: "red",
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    width: 140,
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
